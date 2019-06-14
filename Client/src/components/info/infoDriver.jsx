import React from 'react';
import axios from 'axios';

import moment from 'moment'
import { setCurrentUser } from '../action/authActions'
import jwt from 'jsonwebtoken';

import Error404 from '../404/Error404';

// import abc from "../../img/avt/bike.png";
export default class InfoDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',

            Address: "",
            Birthday: "",
            Email: "",
            IdentityCard: "",
            NumberPhone: "",
            Point: 0,
            Name: "",
            Image: "",

        };



    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
     componentWillMount() {
      
          



            const param = this.props.match.params.id;
            console.log(param)

             axios.get(`/api/account/${param}`)
            .then(({ data: user1 }) => {
                // console.log('user', user1);
                this.setState({
                    Name: user1.Name,
                    imagePreviewUrl: user1.Image,
                })

            });

             axios.get(`/api/user/${param}`)
                .then(({ data: user }) => {
                    // console.log('user', user);
                    this.setState({
                        Address: user.Address,
                        Birthday: moment(user.Birthday).format('YYYY-MM-DD'),
                        Email: user.Email,
                        IdentityCard: user.IdentityCard,
                        NumberPhone: user.NumberPhone,
                        Point: user.Point,

                    })

                });

          

        
        
    }



    _handleImageChange(e) {
        e.preventDefault();

        // let reader = new FileReader();
        // let file = e.target.files[0];

        // reader.onloadend = () => {
        //     this.setState({
        //         file: file,
        //         imagePreviewUrl: reader.result
        //     });
        // }


        // reader.readAsDataURL(file)
    }

    handleSubmit = event => {
        event.preventDefault();



    }


    render() {
        console.log(this.state);
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        console.log(imagePreviewUrl)

        if (imagePreviewUrl) {
            $imagePreview = (
                <img alt="" src={process.env.PUBLIC_URL + imagePreviewUrl} />


            );
        } else {
            $imagePreview = (<div className="previewText text-white">Vui lòng chọn ảnh </div>);
        }


        if (localStorage.jwtToken && setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role ===2) 
        {



        return (
            <div className="Login3">


                <center><h2 className="text-white">Thông Tin Cá Nhân</h2></center>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="previewComponent">
                                {/* <form onSubmit={(e) => this._handleSubmit(e)}> */}
                                <input className="text-white submitButton"
                                    type="file"
                                    onChange={(e) => this._handleImageChange(e)} />


                                {/* <button className="btn btn-default"
                                        type="submit"
                                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button> */}
                                {/* </form> */}
                                <div className="imgPreview">
                                    {$imagePreview}
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4  text-light">
                            <div className="form-group">
                                <label htmlFor="email">Tên Chủ Tài Khoản:</label>
                                <input type="text" className="form-control" id="Name" name="nameCTK" onChange={this.handleChange} value={this.state.Name} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="NS">Ngày Sinh:</label>
                                <input type="date" data-date-format="DD/MM/YYYY" className="form-control" id="Birthday" name="NS" onChange={this.handleChange} value={this.state.Birthday} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="id">CMND:</label>
                                <input type="text" className="form-control" id="IdentityCard" name="id" onChange={this.handleChange} value={this.state.IdentityCard} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Địa Chỉ thường Trú:</label>
                                <input type="text" className="form-control" id="Address" name="dc" onChange={this.handleChange} value={this.state.Address} />
                            </div>

                        </div>

                        <div className="col-md-4  text-light">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" disabled className="form-control" id="Email" name="email" onChange={this.handleChange} value={this.state.Email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sdt">Số Điện thoại:</label>
                                <input type="text" className="form-control" id="NumberPhone" name="sdt" onChange={this.handleChange} value={this.state.NumberPhone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dtl">Điểm Tích Lũy:</label>
                                <input type="text" disabled className="form-control" id="Point" name="dtl" onChange={this.handleChange} value={this.state.Point} />
                            </div> </div>


                    </div>



                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-default" >Lưu Thông Tin</button>
                    </div>
                </form>
            </div>

        );
        }
        else{
            return(
                <Error404></Error404>
            )
        }
    }
}