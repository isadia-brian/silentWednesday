// import {useState} from "react";
// import { DatePicker, Space } from 'antd';
// import 'antd/dist/reset.css';

// import format from "date-fns/format";
// import moment from 'moment'


// import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

// import {BsHouse} from 'react-icons/bs'

// const Calendar = ({onAvailabilityCheck}) => {
//   //toggle open and close for the calendar
//   const [open, setOpen] = useState(false);
//   const { RangePicker } = DatePicker;






//   const [adults, setAdults] = useState(1);
//   const [child, setChild] = useState(0);
//   const [guests, setGuests] = useState(false);
//   const [roomType, setRoomType]=useState("")
//   const [fromDate, setFromDate] = useState()
//   const [toDate, setToDate] = useState()

//   const handleAvailabilityCheck = (e) => {
//     e.preventDefault();
//     const selectedRoomType = roomType;
//     onAvailabilityCheck(selectedRoomType);
//   };

//   const filterByDate = (dates)=>{
//     console.log(moment(dates[0]).format("DD-MM-YYYY"));
//     console.log(moment(dates[2]).format("DD-MM-YYYY"));

//     setFromDate(moment(dates[0]).format("DD-MM-YYYY"))
//     setToDate(moment(dates[1]).format("DD-MM-YYYY"))

//   }

//   return (
    
//   );
// };

// export default Calendar;
