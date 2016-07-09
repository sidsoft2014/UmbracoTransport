using Newtonsoft.Json;
using System;

namespace BitcoinLib.Models
{
    [Serializable]
    public class Ticker
    {
        /*
            Example Data:
            {"last":"0.0251","lowestAsk":"0.02589999","highestBid":"0.0251","percentChange":"0.02390438",
            "baseVolume":"6.16485315","quoteVolume":"245.82513926"}
        */

        [JsonProperty("last")]
        public decimal LastPrice { get; set; }

        [JsonProperty("lowestAsk")]
        public decimal LowestAsk { get; set; }

        [JsonProperty("highestBid")]
        public decimal HighestBid { get; set; }

        [JsonProperty("percentChange")]
        public decimal PercentChange { get; set; }

        [JsonProperty("baseVolume")]
        public decimal BaseVolume { get; set; }

        [JsonProperty("quoteVolume")]
        public decimal QuoteVolume { get; set; }
    }
}
