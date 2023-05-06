function getNewsURL(source: String): string {
    switch (source) {
        case "toi":
            return "https://timesofindia.indiatimes.com/india/orissa"
        case "ht":
            return "https://www.hindustantimes.com/world-news";
        case "otv":
            return "https://odishatv.in/odisha";
        case "ie":
            return "https://indianexpress.com/section/india/";
        default: return ""
    }
}

export default getNewsURL;