const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getRandomQuote = async () => {
    let queryUrl = `${apiBaseUrl}/getQuote`;

    try {
        return await (await fetch(queryUrl)).json();
    } catch (error) {
        return false;
    }
};