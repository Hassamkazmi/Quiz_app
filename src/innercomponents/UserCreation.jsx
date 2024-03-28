import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetGender } from "../redux/Slices/getGender";
import {
  postUserCreation,
  clearData,
} from "../redux/postReducer/postCreateuUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserLogin from "../innercomponents/UserLogin"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./App.css";

const { Option } = Select;

const MyForm = () => {
  const { data: getGender, status } = useSelector((state) => state.getGender);

  const { success, error, loading, userdata } = useSelector(
    (state) => state.postUserCreation
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchgetGender());
  }, []);
  const onFinish = async (Data) => {
    await dispatch(postUserCreation({ Data }));
  };

 
  useEffect(() => {
    if (success) {
      toast(success);
      dispatch(clearData());
      navigate(`/roomselection/${userdata?.roomcode?.Code}`);
    }
    if (error) {
      toast(error);
      dispatch(clearData());
    }
  }, [success, error]);


  return (
    <div className="code-css">
     <div className="row">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div>
            <div className="row">
              <div className="col-sm-6">
                <Form.Item
                  label="Your Name"
                  name="Name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                  labelAlign="top"
                  className="custom-form-item" // Add custom class name
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  label="Your Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                  labelAlign="top"
                  className="custom-form-item" // Add custom class name
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <Form.Item
                  label="Your Age"
                  name="Age"
                  rules={[
                    { required: true, message: "Please input your age!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  label="Your Gender"
                  name="Gender"
                  rules={[
                    { required: true, message: "Please select your gender!" },
                  ]}
                >
                  <Select className="custom-form-item1">
                    {getGender?.map((item, i) => {
                      return <Option value={item._id}>{item?.Name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <Form.Item
                  label="Partner's Name"
                  name="partnerName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your partner's name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                {" "}
                <Form.Item
                  label="Partner's Email"
                  name="Partneremail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your partner's email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-sm-6">
                <Form.Item
                  label="Partner's Age"
                  name="PartnerAge"
                  rules={[
                    {
                      required: true,
                      message: "Please input your partner's age!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                {" "}
               <Form.Item
  label="Partner's Gender"
  name="PartnerGender"
  rules={[
    {
      required: true,
      message: "Please select your partner's gender!",
    },
  ]}
  
>
  <Select  className="custom-form-item1">
    {getGender?.map((item, i) => (
      <Option value={item._id}>{item?.Name}</Option>
    ))}
  </Select>
</Form.Item>

              </div>
            </div>

              <div className="row">
              <div className="col-sm-6">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner's gender!",
                    },
                  ]}
                  label="Description"
                  name="AboutYou"
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
              <div className="col-sm-6" style={{display:"flex", alignItems:"end"}}>
              <Form.Item >
              <Button
              style={{
                margin:"10px"
              }}
                type="primary"
                className="button button-1"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
              </div>
              </div>

           
          </div>
        </Form>
      </div>

    </div>
  );
};

export default MyForm;
