import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetRoomAccess } from "../redux/Slices/getRoomAccess";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

const { Option } = Select;

const MyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ID, setID] = useState(null);
  const [loading, setloading] = useState(false);

  const token = Cookies.get("useToken") 
  const { data: getRoomAccess, status } = useSelector(
    (state) => state.getRoomAccess
  );

  const onFinish = (values) => {
    const id = values.yourName;
    dispatch(fetchgetRoomAccess({ id }));
    setloading(true)
  };

  useEffect(() => {
    if (status && ID) {
      navigate(`/roomselection/${ID}`);
    }
  }, [getRoomAccess]);


  return (
    <div className="">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <Form.Item
          label="Enter Code"
          name="yourName"
          rules={[{ required: true, message: "Please input your code!" }]}
        >
          <Input onChange={(e) => setID(e.target.value)} />
        </Form.Item>

        <Form.Item>
        <Button type="primary" className="button button-1" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    
    </div>
  );
};

export default MyForm;
