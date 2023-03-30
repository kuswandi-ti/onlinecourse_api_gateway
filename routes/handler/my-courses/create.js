const apiAdapter = require('../../api_adapter')
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const myCourse = await api.post('/api/my-courses', req.body);
        return res.json(myCourse.data);
    } catch(error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'Service unavailable !!!'})
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}