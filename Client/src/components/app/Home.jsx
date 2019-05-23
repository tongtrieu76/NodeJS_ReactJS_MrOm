import React from 'react';
import img from '../../img/ohm.png';
import logo from '../../img/mrom.png';
export default class Home extends React.Component {
    render() {
        return (

            <main className="bd-masthead mt-5 mb-5" id="content" role="main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6 mx-auto col-md-6 order-md-2">
                            <img src={img} className="logo" alt="logo" />
                        </div>
                        <div className="col-md-6 order-md-1 text-md-left pr-md-5">
                            <img src={logo} className="App-logo" alt="logo" />

                            <h5 className="text-white text-justify">
                                - Đặt xe chỉ với 2 thao tác đơn giản: <br/>
                                            Đừng quên chọn điểm đến của bạn để nhận thông báo chính xác về giá cước cho chuyến đi.
         
                        <br /><br />

                                - Tài xế năng động: <br/>
                                  Không chỉ giúp bạn tìm được tài xế gần nhất, đến đón bạn nhanh nhất, mà Mr.Ôm còn là dịch vụ di chuyển đáng cân nhắc nhất đó nha!
                         <br /><br />
                                - Dõi theo tài xế: <br/>
                                     Bạn có thể dõi theo di chuyển của tài xế và biết trước thời điểm bạn sẽ được ngồi lên xe!
                        <br />
                            </h5>

                        </div>
                    </div>
                </div>
            </main>
        );
    }
}