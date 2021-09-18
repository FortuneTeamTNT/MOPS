using System;
using LiteDB;

namespace DrillingControlCenter.Data
{
    public class ServerChartData
    {
        public ObjectId Id { get; set; }

        public DateTime Date { get; set; }

        public string DateString => Date.ToString("dd.MM.yyyy HH:mm");

        public double FreeDiskSpace1 { get; set; }
        
        public double FreeDiskSpace2 { get; set; }
        
        public double FreeDiskSpace3 { get; set; }
    }
}