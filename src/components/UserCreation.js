import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetGender } from "../redux/Slices/getGender";
import { postUserCreation , clearData} from "../redux/postReducer/postCreateuUser";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const MyForm = () => {

  const {data : getGender , status} = useSelector((state) => state.getGender)

  const {success, error, loading , userdata} = useSelector((state) => state.postUserCreation)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchgetGender())
  },[])
  const onFinish = async (Data) => {
   await dispatch(postUserCreation({Data}))
  };

  useEffect(() => {
    if(success){
      toast(success)
      dispatch(clearData())
      navigate(`/roomselection/${userdata?.roomcode?.Code}`)
    }
    if(error){
      toast(error)
      dispatch(clearData())

    }
  },[success, error])


  console.log(success, error, loading , userdata)

  return (
    <div className="code-css">
        <h3>Create a code ...</h3>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: "auto" }}
      >
       <div>
       <Form.Item
          label="Your Name"
          name="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Your Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Age"
          name="Age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Your Gender"
          name="Gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select>
            {
              getGender?.map((item , i) => {
                return(
                  <Option value={item._id}>{item?.Name}</Option>
                )
              })
            }
           
          </Select>
        </Form.Item>

        <Form.Item
          label="Partner's Name"
          name="partnerName"
          rules={[
            { required: true, message: "Please input your partner's name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Partner's Email"
          name="Partneremail"
          rules={[
            { required: true, message: "Please input your partner's email!" },
          ]}
        >
          <Input />
        </Form.Item>


       </div>
       <div>
       <Form.Item
          label="Partner's Age"
          name="PartnerAge"
          rules={[
            { required: true, message: "Please input your partner's age!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Partner's Gender"
          name="PartnerGender"
          rules={[
            { required: true, message: "Please select your partner's gender!" },
          ]}
        >
          <Select>
          {
              getGender?.map((item , i) => {
                return(
                  <Option value={item._id}>{item?.Name}</Option>
                )
              })
            }
            </Select>
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please select your partner's gender!" },
          ]}
          label="Description"
          name="AboutYou"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
       </div>
      </Form>
    </div>
  );
};

export default MyForm;
