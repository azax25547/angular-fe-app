function getNewsURL(source: String): string {
    switch (source) {
        case "toi":
            return "https://timesofindia.indiatimes.com/india"
        case "ht":
            return "https://www.hindustantimes.com/latest-news";
        case "otv":
            return "https://odishatv.in/odisha";
        case "ie":
            return "https://indianexpress.com/todays-paper/";
        default: return ""
    }
}

export default getNewsURL;