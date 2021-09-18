using System;
using LiteDB;

namespace DrillingControlCenter.Data
{
    public class BitLoadData
    {
        public ObjectId Id { get; set; }

        public DateTime Date { get; set; }

        public string DateString => Date.ToString("dd.MM.yyyy HH:mm");

        public double BitLoad { get; set; }

        public int Alert { get; set; }

        public string Recommendation { get; set; }
    }
}