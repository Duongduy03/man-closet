export const getCookie = (cookieName:string) => {
    // Tách chuỗi cookie thành các cặp key-value
    const cookies = document.cookie.split(';');
    console.log(cookies);
    
    // Duyệt qua từng cặp key-value để tìm cookie cần lấy
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const pair = cookie.split('=');

        // Nếu tên cookie trùng khớp, trả về giá trị của nó
        if (pair[0] === cookieName) {
            return pair[1];
        }
    }

    // Trả về null nếu không tìm thấy cookie
    return null;
  }