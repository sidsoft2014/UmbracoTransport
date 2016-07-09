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
    public class PoloniexAPI
    {
        private const string _baseUrl = @" https://poloniex.com/public";
        private readonly Dictionary<string, string> _commands = new Dictionary<string, string>
        {
            {"tickers", "returnTicker" },
            {"orderBook", "returnOrderBook&currencyPair={0}&depth=10" }
        };

        public Dictionary<string, Ticker> GetTickers()
        {
            var url = $"{_baseUrl}?command=returnTicker";
            using(var wc = new WebClient())
            {
                try
                {
                    // Get data from the API.
                    // Usualy I would use DownloadStringTaskAsync, to prevent UI blocking, but MVC kicks off when I try this.
                    var json = wc.DownloadString(url);

                    // When the API we are getting the JSON from changes it's format this WILL break.
                    // When this happens check the JSON data to see what fields have been added, removed, changed name or had data type altered and then adjust the Ticker object to match.
                    // If this is not the fix then the overall structure of the response must have changed. In this case, as well as the above, check the overall structure of the string.
                    // (i.e. Is it still a Key-Value pair? Is the Key still a string? etc...)
                    var tickers = JsonConvert.DeserializeObject<Dictionary<string, Ticker>>(json);
                    return tickers;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
        
    }
}
