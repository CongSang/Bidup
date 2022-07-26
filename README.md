# Bidup

trang mạng xã hội với tính năng đấu giá

### Features

- Đăng nhập (vai trò Người dùng, Quản trị)
- Đăng kí người dùng
- Hiển thị, đăng, xóa, cập nhật bài viết, bài đấu giá
- Hashtag, tìm kiếm theo hashtag
- Lọc tìm kiếm người dùng, bài viết, bài đấu giá
- Like, comment bài viết
- Like, trả lời comment
- Đấu giá bài từ thiện
- Xác nhận người thắng đấu giá và gửi email đến những người tham gia khi kết thúc đấu giá
- Report bài viết, bài đấu giá, người dùng
- Trang cá nhân người dùng
- Notification realtime khi có tương tác (socket)
- Dẫn đến bài viết, bài đấu giá đã được thông báo khi nhấp vào notification
- Chat realtime (firebase)
- Người dùng quản trị có thể xem thống kê báo cáo, xử lí report

### Main technology used

- Java Spring MVC, Spring security
- MySQL, Hibernate
- Firebase (chat realtime), FB Graph API, Cloudinary 
- Javascript, Jquery, Ajax, Bootstrap5, Websocket

### Made by

- Dương Kim Quốc (front-end, back-end, database)
- Hồ Nguyễn Công Sang (front-end, back-end, database)

### Preview

![Preview 1](https://res.cloudinary.com/dynupxxry/image/upload/v1660967300/SharingHopePreview/preview1_zubsst.png)

![Preview 2](https://res.cloudinary.com/dynupxxry/image/upload/v1660967302/SharingHopePreview/preview2_jn0hur.png)

![Preview 3](https://res.cloudinary.com/dynupxxry/image/upload/v1660967309/SharingHopePreview/preview4_ookazp.png)

### Hướng dẫn cài đặt
- Cài đặt Netbean
- Mở thư mục project trên Netbean
- Tạo database csmdb và import file csmdb.sql ở thư mục mysql để restore lại database.
- Mở file src/main/resources/database.properties và chỉnh hibernate.connection.username và hibernate.connection.password cho chính xác với mysql account.
- Cài đặt Tomcat 9 và run server Tomcat 9 ở mục Services
- Run app
