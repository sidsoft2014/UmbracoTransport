using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BitcoinLib.Models;

namespace BitcoinLib.Exchanges
{
    class PoloniexAPI
    {
        private const string _baseUrl = @" https://poloniex.com/public";
        private readonly Dictionary<string, string> _commands = new Dictionary<string, string>
        {
            {"tickers", "returnTicker" }
        };

        public Dictionary<string, Ticker> GetTickers()
        {
            var url = $"{_baseUrl}+?command=returnTicker";
            using(var wc = new WebClient())
            {
                try
                {
                    var json = wc.DownloadString(url);
                    var tickers = JsonConvert.DeserializeObject<Dictionary<string, Ticker>>(json);
                    return tickers;
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}
