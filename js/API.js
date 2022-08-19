class Api {
    constructor() {
        this.url = "https://api.themoviedb.org/3";
        this.headers = { "Content-Type": "application/json" };
        this.key = "cab0b107c1583b3f1d9262d17e4ef69a"
    };

    // async fetchById (category, ranking, page=1) {
    //     const res = await fetch(`${this.url}/${category}/${ranking}?api_key=${this.key}&language=uk-UA`, {
    //         method: "GET"
    //     });
    //     const data = await res.json();
    //     return data;
    // };

    async fetchPopular (category, ranking, page=1) {
        // const res = await fetch(`${this.url}/${category}/${ranking}?api_key=${this.key}&language=uk-UA&page=${page}`, {
        const res = await fetch(`${this.url}/${category}/${ranking}?api_key=${this.key}&language=uk-UA&page=${page}`, {
            method: "GET"
        });
        const data = await res.json();
        return data;
    };

    async search (category, searchString, page=1) {
        const res = await fetch(`${this.url}/search/${category}?api_key=${this.key}&language=uk-UA&query=${searchString}&page=${page}`, {
            method: "GET"
        });
        const data = await res.json();
        return data;
    };


    async searchId (id) {
        const res = await fetch(`${this.url}/account/multi?api_key=${this.key}&query=${id}`, {
            method: "GET"
        });
        const data = await res.json();
        return data;
    };

};

export default new Api();
