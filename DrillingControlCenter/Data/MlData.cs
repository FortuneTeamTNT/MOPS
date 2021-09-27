using Microsoft.ML.Data;

namespace DrillingControlCenter.Data
{
    public class MlData
    {
        [LoadColumn(0)] public float BitLoad;
        
        [LoadColumn(1)] public float Alert;
    }
}