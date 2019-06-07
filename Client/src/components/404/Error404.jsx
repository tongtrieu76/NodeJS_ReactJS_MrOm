import React from 'react';

export default class Error404 extends React.Component {
    render() {
        return (

            <div className="text-center text-light inner-div container">
            <div className="row">
              <div className="col-md-12">
                <div className="error-template">
                  <h1 className="text-danger">
                   Có Gì Đó Không Ổn!</h1>
                  <h2>
                  Xin lỗi, không tìm thấy trang!</h2>
                  
                
                </div>
              </div>
            </div>
          </div>
        );
    }
}