const apiAdapter = require('../../api_adapter')
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const courses = await api.get('/api/courses', {
            params: {
                ...req.query
            }
        });
        return res.json(courses.data);
    } catch(error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'Service unavailable !!!'})
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}