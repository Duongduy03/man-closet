const useChangeDate = (timeUTC: any) => {

    // Chuyển đổi thời gian sang đối tượng Date
    const dateUTC = new Date(timeUTC);

    // Lấy thời gian hiện tại ở múi giờ UTC (đơn vị milliseconds)
    const timeInMilliseconds = dateUTC.getTime();

    // Lấy độ chênh lệch múi giờ Việt Nam so với UTC
    const offsetVietnam = 7; // UTC+7

    // Chuyển múi giờ từ UTC sang múi giờ Việt Nam
    const timeVietnam = new Date(timeInMilliseconds + (offsetVietnam * 60 * 60 * 1000));

    // Format lại thời gian theo định dạng mong muốn
    const formattedTimeVietnam = `${timeVietnam.getFullYear()}-${(timeVietnam.getMonth() + 1).toString().padStart(2, '0')}-${timeVietnam.getDate().toString().padStart(2, '0')} ${timeVietnam.getHours().toString().padStart(2, '0')}:${timeVietnam.getMinutes().toString().padStart(2, '0')}:${timeVietnam.getSeconds().toString().padStart(2, '0')}`;
    return formattedTimeVietnam
}

export default useChangeDate