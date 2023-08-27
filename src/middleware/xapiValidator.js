function xapiValidator(req, res, next) {
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey != process.env.xApiKey) {
        return res.status(401).json({ message: "Invalid x-api-key" });
    }
    next()
}

export default xapiValidator