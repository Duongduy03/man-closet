import instance from "../instance";

interface dataSendMessage {
    from: string,
    to: string,
    message: string,
}

interface dataGetAllMessage {
    from: string,
    to: string,
}
export const sendMessage = async (data: dataSendMessage) => {
    const response = await instance.post(`api/message/addMessage`, data)
    return response
}

export const getAllMessage = async (data:dataGetAllMessage ) => {
    const response = await instance.post(`api/message/getAllMessage`, data)
    return response
}