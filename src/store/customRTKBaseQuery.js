
// for Custom RTK
import apis from "../apis";

const axiosBaseQuery = () => {
    return async ({url, method, data, params}) => {
        try {
            const result = await apis({url: url, method, data, params})
            return {data: result.data}
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }
}


export default axiosBaseQuery