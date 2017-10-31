// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
// 

using AutoRest.Core;
using AutoRest.Core.Logging;
using AutoRest.Core.Model;
using AutoRest.Core.Model.XmsExtensions;
using AutoRest.Core.Utilities;
using AutoRest.TypeScript.Model;
using AutoRest.TypeScript.vanilla.Templates;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AutoRest.Core.Utilities.DependencyInjection;

namespace AutoRest.TypeScript
{
    public class CodeGeneratorTS : CodeGenerator
    {
        private const string ClientRuntimePackage = "ms-rest-js version 1.0.0";


        public override string ImplementationFileExtension => ".ts";


        public override string UsageInstructions => $"The {ClientRuntimePackage} or higher npm package is required to execute the generated code.";

        /// <summary>
        ///     Generate TypeScript client code 
        /// </summary>
        /// <param name="serviceClient"></param>
        /// <returns></returns>
        public override async Task Generate(CodeModel cm)
        {
            var codeModel = cm as CodeModelTS;
            if (codeModel == null)
            {
                throw new InvalidCastException("CodeModel is not a TypeScript code model.");
            }

            codeModel.PackageName = Settings.Instance.PackageName;
            codeModel.PackageVersion = Settings.Instance.PackageVersion;

            // Service client
            var serviceClientTemplate = new ServiceClientTemplate {Model = codeModel};
            await Write(serviceClientTemplate, codeModel.Name.ToCamelCase() + ".ts");

            //Models
            if (codeModel.ModelTypes.Any())
            {
                var modelIndexTemplate = new ModelIndexTemplate {Model = codeModel};
                await Write(modelIndexTemplate, Path.Combine("models", "index.ts"));
                var mapperIndexTemplate = new MapperIndexTemplate {Model = codeModel};
                await Write(mapperIndexTemplate, Path.Combine("models", "mappers.ts"));
            }

            //MethodGroups
            if (codeModel.MethodGroupModels.Any())
            {
                var methodGroupIndexTemplate = new MethodGroupIndexTemplate {Model = codeModel};
                await Write(methodGroupIndexTemplate, Path.Combine("operations", "index.ts"));

                foreach (var methodGroupModel in codeModel.MethodGroupModels)
                {
                    var methodGroupTemplate = new MethodGroupTemplate {Model = methodGroupModel};
                    await Write(methodGroupTemplate, Path.Combine("operations", methodGroupModel.TypeName.ToCamelCase() + ".ts"));
                }
            }

            var generateMetadata = Singleton<GeneratorSettingsTS>.Instance.GenerateMetadata;
            if (generateMetadata)
            {
                // package.json
                var packageJson = new PackageJson { Model = codeModel };
                await Write(packageJson, Path.Combine("../", "package.json"));

                //tsconfig.json
                var nodeTsConfig = new TsConfig { Model = new TsConfigModel(false) };
                await Write(nodeTsConfig, Path.Combine("../", "tsconfig.json"));

                // webpack.config.js
                var webpackConfig = new WebpackConfig { Model = codeModel };
                await Write(webpackConfig, Path.Combine("../", "webpack.config.js"));

                // .npmignore
                var npmIgnore = new NpmIgnore { Model = codeModel };
                await Write(npmIgnore, Path.Combine("../", ".npmignore"));

                //README.md
                var readme = new ReadmeTemplate { Model = codeModel };
                await Write(readme, Path.Combine("../", "README.md"));
            }
        }

        private string CreateEnumInitializer(EnumType et, JToken obj, int indent = 0)
        {
            if (obj == null)
            {
                return "undefined";
            }
            var indentString = new string(' ', 2);
            var totalIndent = string.Concat(Enumerable.Repeat(indentString, indent));
            var result = new StringBuilder();
            var cm = et.CodeModel as CodeModelTS;
            result.Append($"<{cm.ClientPrefix}Models.{et.ClassName}>{CodeNamer.Instance.EscapeDefaultValue(obj.ToString(), et)}");

            return result.ToString();
        }
        private string CreateObjectInitializer(CompositeType type, JObject obj, int indent = 0)
        {
            if (obj == null)
            {
                return "undefined";
            }
            var indentString = new string(' ', 2);
            var totalIndent = string.Concat(Enumerable.Repeat(indentString, indent));

            var properties = type.Properties.ToArray();

            var result = new StringBuilder();
            var propertyInitializers = new List<string>();
            foreach (var prop in properties)
            {
                var propValue = obj.SelectToken(prop.SerializedName);
                if (propValue != null)
                {
                    propertyInitializers.Add(totalIndent + indentString + $"{prop.Name}: {CreateInitializer(prop.ModelType, propValue, indent + 1)}");
                }
                else if (prop.IsRequired)
                {
                    Logger.Instance.Log(Category.Error, $"Required property '{prop.Name}' of type '{type.ClassName}' not found.");
                }
            }
            if (propertyInitializers.Count > 0)
            {
                // special treatment for SubResource
                //if (type.ClassName.Split('.').Last() == "SubResource" && properties.Length == 1 && properties[0].SerializedName == "id")
                //{
                //    result.Append($"{obj.SelectToken("id").ToString(Newtonsoft.Json.Formatting.None)}");
                //}
                //else
                //{
                    result.AppendLine("{");
                    result.AppendLine($"{totalIndent}{string.Join(",\n", propertyInitializers)}");
                    result.Append($"{totalIndent}}}");
                //}
            }
            else
            {
                result.Append("{}");
            }
            return result.ToString();
        }
        
        private string CreateSequenceInitializer(SequenceType type, JArray arr, int indent = 0)
        {
            if (arr == null)
            {
                return "undefined";
            }

            var indentString = new string(' ', 2);
            var totalIndent = string.Concat(Enumerable.Repeat(indentString, indent));

            var result = new StringBuilder();
            var itemInitializer = new List<string>();
            foreach (var item in arr)
            {
                itemInitializer.Add(totalIndent + indentString + CreateInitializer(type.ElementType, item, indent + 1));
            }
            if (itemInitializer.Count > 0)
            {
                result.AppendLine("[");
                result.AppendLine(totalIndent + string.Join(",\n", itemInitializer));
                result.Append(totalIndent + "]");
            }
            else
            {
                result.Append("[]");
            }
            return result.ToString();
        }

        private string CreateInitializer(IModelType type, JToken token, int indent = 0)
            => type is CompositeType ct
            ? CreateObjectInitializer(ct, token as JObject, indent)
            : type is SequenceType st
            ? CreateSequenceInitializer(st, token as JArray, indent)
            : type is EnumType et
            ? CreateEnumInitializer(et, token, indent)
            : CodeNamer.Instance.EscapeDefaultValue(token.ToString(), type);

        public string GeneratePrefix(CodeModelTS codeModel)
        {
            var result = new IndentedStringBuilder("  ");
            result.AppendLine("import * as msRestAzure from \"ms-rest-azure-js\";")
                  .AppendLine("import * as msRest from \"ms-rest-js\";")
                  .AppendLine("import * as msRestNodeAuth from \"ms-rest-nodeauth\";")
                  .AppendLine($"import {{ {codeModel.Name}, {codeModel.ClientPrefix}Models }} from \"{codeModel.PackageName}\";")
                  .AppendLine("")
                  .AppendLine("const subscriptionId = \"012-334-555-656\";")
                  .AppendLine("// Calling the async executeContext method")
                  .AppendLine("executeContext().catch((err) => { console.log(err); });")
                  .AppendLine("// Function Definition")
                  .AppendLine("async function executeContext(): Promise<void> {").Indent()
                  .AppendLine("// Authenticate.")
                  .AppendLine("const credentials = await msRestNodeAuth.interactiveLogin();")
                  .AppendLine("// Create client.")
                  .AppendLine($"const client = new {codeModel.Name}(credentials, subscriptionId);");
            return result.ToString();
        }

        public string GenerateCoreSample(CodeModelTS codeModel, MethodGroupTS group, MethodTS method, string exampleName, Example example)
        {
            var clientInstanceName = "client";
            var result = new IndentedStringBuilder("  ");
            // parameter preparation
            var paramaters = new List<string>();
            
            foreach (var formalParameter in method.LocalParameters)
            {
                // parameter found in x-ms-examples?
                var foundParameterInExample = example.Parameters.TryGetValue(formalParameter.SerializedName, out JToken token);
                if (!foundParameterInExample && method.InputParameterTransformation?.Count() > 0)
                {
                    foreach (var transformation in method.InputParameterTransformation)
                    {
                        // get the associated name of the parameter before it was flattened and try searching by that name in examples
                        var lookupName = transformation.OutputParameter.SerializedName;
                        if (example.Parameters.TryGetValue(lookupName, out JToken lookupToken))
                        {
                            // select the value provided for the flattened parameter from the example
                            token = lookupToken.SelectToken(formalParameter.SerializedName);
                            if (token != null) foundParameterInExample = true;
                        }
                    }
                }
                if (foundParameterInExample)
                {
                    var value = CreateInitializer(formalParameter.ModelType, token);
                    // initialize composite type beforehand
                    if (formalParameter.ModelType is CompositeType ct)
                    {
                        var modelPrefix = $"{codeModel.ClientPrefix}Models";
                        if (formalParameter.ModelType.ClassName.EqualsIgnoreCase("RequestOptionsBase"))
                        {
                            modelPrefix = "msRest";
                        }
                        result.AppendLine($"const {formalParameter.Name}: {modelPrefix}.{formalParameter.ModelType.ClassName} = {value};");
                    }
                    else
                    {
                        result.AppendLine($"const {formalParameter.Name} = {value};");
                    }
                    paramaters.Add(formalParameter.Name);
                }
                else if (formalParameter.IsRequired) // ...but it should be there!
                {
                    Logger.Instance.Log(Category.Error, $"Required parameter '{formalParameter.SerializedName}' not found.");
                    return null;
                }
            }
            result.AppendLine("");

            // call
            var returnTypeName = method.ReturnType.Body?.Name ?? method.ReturnType.Headers?.Name;
            returnTypeName = returnTypeName != null ? returnTypeName.ToCamelCase() : $"{method.Name}Result";

            result.AppendLine($"const {returnTypeName} = await {clientInstanceName}" +
                              $"{(group.Name.IsNullOrEmpty() ? "" : "." + group.NameForProperty)}.{method.Name}(" +
                              $"{string.Join(", ", paramaters.Select(param => param))});")
                  .AppendLine($"console.log({returnTypeName});");

            return result.ToString();
        }

        public override string GenerateSample(bool isolateSnippet, CodeModel cm, MethodGroup g, Method m, string exampleName, Example example)
        {
            var codeModel = cm as CodeModelTS;
            var method = m as MethodTS;
            var group = g as MethodGroupTS;
            var groupName = group.Name.IsNullOrEmpty() ? "" : group.Name.ToPascalCase();
            var sampleName = $"{groupName}{method.Name.ToPascalCase()}Sample";

            codeModel.PackageName = Settings.Instance.PackageName;
            codeModel.PackageVersion = Settings.Instance.PackageVersion;
            var result = new IndentedStringBuilder("  ");
            result.AppendLine("/**");

            if (!string.IsNullOrEmpty(example.Title))
            {
                result.AppendLine($"#### Title: {example.Title}").AppendLine("");
            }

            if (!string.IsNullOrEmpty(example.Description))
            {
                result.AppendLine($"#### Description:\n{example.Description}").AppendLine("");
            }

            result.AppendLine("@example")
                  .AppendLine("```typescript")
                  .AppendLine("")
                  .AppendLine(GeneratePrefix(codeModel))
                  .Indent()
                  .AppendLine(GenerateCoreSample(codeModel, group, method, exampleName, example).TrimEnd('\n'))
                  .Outdent()
                  .AppendLine("}")
                  .AppendLine($"```")
                  .AppendLine($" */")
                  .AppendLine($"var {sampleName};");
            var resultAsString = result.ToString().Split("\n");
            for (int i = 1; i < resultAsString.Length-3; i++)
            {
                resultAsString[i] = $" * {resultAsString[i]}";
            }

            return string.Join("\n", resultAsString);
        }

        public override string GenerateSampleWithPrefix(bool isolateSnippet, CodeModel cm, MethodGroup g, Method m, string exampleName, Example example, bool applyPrefix, bool isLast)
        {
            var codeModel = cm as CodeModelTS;
            var method = m as MethodTS;
            var group = g as MethodGroupTS;

            codeModel.PackageName = Settings.Instance.PackageName;
            codeModel.PackageVersion = Settings.Instance.PackageVersion;

            var result = new IndentedStringBuilder("  ");
            if (applyPrefix)
            {
                result.AppendLine(GeneratePrefix(codeModel));
            }
            //Always indent as we need to start inside the execute function
            result.Indent()
                  .AppendLine("{")
                  .Indent()
                  .AppendLine(GenerateCoreSample(codeModel, group, method, exampleName, example).TrimEnd())
                  .Outdent()
                  .AppendLine("}");
            if (isLast)
            {
                result.Outdent().AppendLine("}");
            }
            return result.ToString();
        }
    }
}
