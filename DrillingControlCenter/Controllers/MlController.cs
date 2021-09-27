using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using DrillingControlCenter.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using Microsoft.ML.Data;

namespace DrillingControlCenter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MlController : ControllerBase
    {
        private static readonly string BaseDatasetsRelativePath = @"../../..";
        private static readonly string DatasetRelativePath = $"{BaseDatasetsRelativePath}/model.zip";
        private static readonly string DatasetPath = GetAbsolutePath(DatasetRelativePath);

        MLContext mlContext = new MLContext(seed: 0);

        public bool BuildTrainEvaluateAndSaveModel()
        {
            var db = Program.GetDatabase();

            var mlData = new List<MlData>();
            var col = db.GetCollection<BitLoadData>("bitloads");
            foreach (var data in col.Query().ToList())
            {
                mlData.Add(new MlData
                {
                    BitLoad = (float)data.BitLoad,
                    Alert = data.Alert
                });
            }

            var trainingDataView =
                mlContext.Data.LoadFromEnumerable(mlData);
            var testDataView =
                mlContext.Data.LoadFromEnumerable(mlData.GetRange(0, 300).ToList());

            var dataProcessPipeline = mlContext.Transforms.Conversion
                .MapValueToKey(outputColumnName: "KeyColumn", inputColumnName: nameof(MlData.Alert))
                .Append(mlContext.Transforms.Concatenate("Features", nameof(MlData.BitLoad))
                    .AppendCacheCheckpoint(mlContext));

            var trainer = mlContext.MulticlassClassification.Trainers
                .SdcaMaximumEntropy(labelColumnName: "KeyColumn", featureColumnName: "Features")
                .Append(mlContext.Transforms.Conversion.MapKeyToValue(outputColumnName: nameof(MlData.Alert),
                    inputColumnName: "KeyColumn"));

            var trainingPipeline = dataProcessPipeline.Append(trainer);

            ITransformer trainedModel = trainingPipeline.Fit(trainingDataView);

            var predictions = trainedModel.Transform(testDataView);
            mlContext.MulticlassClassification.Evaluate(predictions, "Alert", "Score");

            mlContext.Model.Save(trainedModel, trainingDataView.Schema, DatasetPath);

            return true;
        }

        [HttpGet]
        [Route("Test")]
        public string TestSomePredictions(float bitLoad)
        {
            if (!System.IO.File.Exists(DatasetPath))
            {
                BuildTrainEvaluateAndSaveModel();
            }

            ITransformer trainedModel =
                mlContext.Model.Load(DatasetPath, out var modelInputSchema);

            var predEngine = mlContext.Model.CreatePredictionEngine<MlData, AlertPrediction>(trainedModel);

            VBuffer<float> keys = default;
            predEngine.OutputSchema["PredictedLabel"].GetKeyValues(ref keys);
            var labelsArray = keys.DenseValues().ToArray();

            Dictionary<float, string> Alerts = new Dictionary<float, string>();
            Alerts.Add(0, "Нагрузки нет");
            Alerts.Add(1, "Нагрузка на долото в пределах нормы");
            Alerts.Add(2,
                "Нагрузка на долото в пределах нормы. Будьте внимательны. Резкое увеличение нагрузки может привести к аварии");
            Alerts.Add(3,
                "Важно! Нагрузка на долото выше нормы. Необходимо снизить скорость бурения и выполнить действия снижающие нагрузку на долото");
            Alerts.Add(4,
                "Критично! Нагрузка на долото зашкаливает! Началось автоматическое снижение давления на долото");

            var resultprediction = predEngine.Predict(new MlData()
            {
                BitLoad = bitLoad
            });

            StringBuilder sb = new StringBuilder();

            sb.AppendLine($"{Alerts[labelsArray[0]]}: {resultprediction.Score[0]:0.####}");
            sb.AppendLine($"{Alerts[labelsArray[1]]}: {resultprediction.Score[1]:0.####}");
            sb.AppendLine($"{Alerts[labelsArray[2]]}: {resultprediction.Score[2]:0.####}");
            sb.AppendLine($"{Alerts[labelsArray[3]]}: {resultprediction.Score[3]:0.####}");
            sb.AppendLine($"{Alerts[labelsArray[4]]}: {resultprediction.Score[4]:0.####}");
            sb.AppendLine();

            return sb.ToString();
        }

        public static string GetAbsolutePath(string relativePath)
        {
            FileInfo _dataRoot = new FileInfo(typeof(Program).Assembly.Location);
            string assemblyFolderPath = _dataRoot.Directory.FullName;

            string fullPath = Path.Combine(assemblyFolderPath, relativePath);

            return fullPath;
        }
    }
}