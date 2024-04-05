import React, { useState } from 'react';
import './App.css';
import { FaPlus } from 'react-icons/fa';
import logo from '../src/imgs/logo2.png';
const Card = ({ initialTitle }) => {
  const [title, setTitle] = useState(initialTitle);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [kilograms, setKilograms] = useState('');
  const [pricePerKilogram, setPricePerKilogram] = useState('');
  const [irrigationMethod, setIrrigationMethod] = useState('');
  const [zakatPercentage, setZakatPercentage] = useState(0);
  const [zakatWeightValue, setZakatWeightValue] = useState(0);
  const [zakatAmount, setZakatAmount] = useState(0);
  const [goldPrice, setGoldPrice] = useState('');
  const [nisaab, setNisaab] = useState('');
  const [amount, setAmount] = useState('');
  const [weight18, setWeight18] = useState('');
  const [weight21, setWeight21] = useState('');
  const [weight22, setWeight22] = useState('');
  const [weight24, setWeight24] = useState('');
  const [totalWeight, setTotalWeight] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [propertyValue, setPropertyValue] = useState('');
  

  const calculatePropertyZakat = () => {
    const calculatedZakat = propertyValue >= nisaab ? propertyValue * (2.5 / 100) : 'لا توجد زكاة';
    setZakatAmount(calculatedZakat);
    setShowResult(true);
  };
  

 
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    switch (initialTitle) {
      case "زكاة الزروع والثمار":
        setTitle(showDetails ? "زكاة الزروع والثمار" : "حساب زكاة الزروع والثمار");
        break;
      case "زكاة الذهب":
        setTitle(showDetails ? "زكاة الذهب" : "حساب زكاة الذهب");
        break;
      case "زكاة المال":
        setTitle(showDetails ? "زكاة المال" : "حساب زكاة المال");
        break;
      case "زكاة العقار المؤجر":
        setTitle(showDetails ? "زكاة العقار المؤجر" : "حساب زكاة العقار المؤجر");
        break;
      default:
        setTitle(initialTitle);
    }
  };
  

  const handleKilogramsChange = (e) => {
    const kg = parseFloat(e.target.value);
    setKilograms(kg);
  };

  const handlePricePerKilogramChange = (e) => {
    const price = parseFloat(e.target.value);
    setPricePerKilogram(price);
  };

  const handleIrrigationMethodChange = (e) => {
    const method = e.target.value;
    setIrrigationMethod(method);
  };

  const handleGoldPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setGoldPrice(price);
    setNisaab(price * 85);
  };

  const handleAmountChange = (e) => {
    const money = parseFloat(e.target.value);
    setAmount(money);
    calculateZakatAmount(money);
  };

  const calculateZakat = () => {
    let zakatPercentage = 0;
    if (kilograms > 653) {
      if (irrigationMethod === "يسقى بهما مناصفة") {
        zakatPercentage = 7.5;
      } else if (irrigationMethod === "يسقى بدون تكلفة كماء المطر") {
        zakatPercentage = 10;
      } else if (irrigationMethod === "يسقى بتكلفةباستخدام الالات") {
        zakatPercentage = 5;
      }
    }
    setZakatPercentage(zakatPercentage);
      
    const zakatWeightValue = (zakatPercentage / 100) * kilograms;
    setZakatWeightValue(zakatWeightValue);

    const zakatAmount = zakatWeightValue * pricePerKilogram;
    setZakatAmount(zakatAmount);

    setShowResult(true);
  };

  const calculateZakatAmount = (money) => {
    if (money >= nisaab) {
      setZakatAmount(money * 0.025); // 2.5% of the amount
    } else {
      setZakatAmount('لا توجد زكاة');
    }
  };

  const calculateGoldZakat = () => {
    const weight18To24 = parseFloat(weight18) * (18 / 24);
    const weight21To24 = parseFloat(weight21) * (21 / 24);
    const weight22To24 = parseFloat(weight22) * (22 / 24);
    const goldWeight24 = parseFloat(weight24);
    const totalGoldWeight24 = weight18To24 + weight21To24 + weight22To24 + goldWeight24;
    setTotalWeight(totalGoldWeight24);

    // Calculate Zakat amount
    if (totalGoldWeight24 >= 85) {
      const zakat = totalGoldWeight24 * goldPrice * 0.025; // Assuming the gold price is per gram
      setZakatAmount(zakat);
    } else {
      setZakatAmount('لا يوجد زكاة');
    }

    // Show the result labels
    setShowResult(true);
  };

  const handleTextFieldClick = (e) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the card
  };

  const renderCardContent = () => {
    switch (initialTitle) {
      case "زكاة المال":
        return (
          <>
            <div className="form-group">
              <label>سعر الذهب</label>
              <input
                type="number"
                value={goldPrice}
                onChange={handleGoldPriceChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل سعر الذهب عيار 24 اليوم"
              />
            </div>
            <div className="form-group">
              <label>قيمة النصاب</label>
              <input type="text" value={nisaab} disabled onClick={handleTextFieldClick} />
            </div>
            <div className="form-group">
              <label>المبلغ</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل المبلغ"
              />
            </div>
            <div className="form-group">
              <label>مبلغ الزكاة</label>
              <input type="text" value={zakatAmount} disabled onClick={handleTextFieldClick} />
            </div>
          </>
        );
      case "زكاة الذهب":
        return (
          <>
           <div className="form-group">
              <label>سعر الذهب</label>
              <input
                type="number"
                value={goldPrice}
                onChange={handleGoldPriceChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل سعر الذهب عيار 24 اليوم"
              />
            </div>
            <div className="form-group">
              <label>وزن الذهب عيار 18 بالجرام</label>
              <input
                type="number"
                value={weight18}
                onChange={(e) => setWeight18(e.target.value)}
                onClick={handleTextFieldClick}
                placeholder="قم بادخال جرامات الذهب عيار 18 التى تمتلكها واذا لم يوجد ضع 0"
              />
            </div>
            <div className="form-group">
              <label>وزن الذهب عيار 21 بالجرام</label>
              <input
                type="number"
                value={weight21}
                onChange={(e) => setWeight21(e.target.value)}
                onClick={handleTextFieldClick}
                placeholder="قم بادخال جرامات الذهب عيار 21 التى تمتلكها واذا لم يوجد ضع 0"
              />
            </div>
            <div className="form-group">
              <label>وزن الذهب عيار 22 بالجرام</label>
              <input
                type="number"
                value={weight22}
                onChange={(e) => setWeight22(e.target.value)}
                onClick={handleTextFieldClick}
                placeholder="قم بادخال جرامات الذهب عيار 22 التى تمتلكها واذا لم يوجد ضع 0"
              />
            </div>
            <div className="form-group">
              <label>وزن الذهب عيار 24 بالجرام</label>
              <input
                type="number"
                value={weight24}
                onChange={(e) => setWeight24(e.target.value)}
                onClick={handleTextFieldClick}
                placeholder="قم بادخال جرامات الذهب عيار 24 التى تمتلكها واذا لم يوجد ضع 0"
              />
            </div>
            <div className="form-group">
              <button onClick={(e) => { calculateGoldZakat(); handleTextFieldClick(e); }}>حساب الزكاة</button>
            </div>
          </>
        );
      case "زكاة الزروع والثمار":
        return (
          <>
            <div className="form-group">
              <label>عدد الكيلوجرامات التى تملكها</label>
              <input
                type="number"
                value={kilograms}
                onChange={handleKilogramsChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل عدد الكيلوجرامات"
              />
            </div>
            <div className="form-group">
              <label>سعر الكيلوجرام الواحد</label>
              <input
                type="number"
                value={pricePerKilogram}
                onChange={handlePricePerKilogramChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل سعر الكيلوجرام الواحد"
              />
            </div>
            <div className="form-group" style={{direction:"rtl"}}>
              <label>طريقة الرى</label>
              <select value={irrigationMethod} onChange={handleIrrigationMethodChange} onClick={handleTextFieldClick} className="custom-select" style={{fontSize:"22px",fontFamily: 'ElMessiri-Regular'}}>
                <option value="">اختر الطريقة</option>
                <option value="يسقى بتكلفةباستخدام الالات">يسقى بتكلفةباستخدام الالات</option>
                <option value="يسقى بدون تكلفة كماء المطر">يسقى بدون تكلفة كماء المطر</option>
                <option value="يسقى بهما مناصفة">يسقى بهما مناصفة</option>
              </select>
            </div>
            <div className="form-group">
              <button onClick={(e) => { calculateZakat(); handleTextFieldClick(e); }}>حساب الزكاة</button>
            </div>
          </>
        );
        case "زكاة العقار المؤجر ":
          return (
            <>
            <div className="form-group">
              <label>سعر الذهب</label>
              <input
                type="number"
                value={goldPrice}
                onChange={handleGoldPriceChange}
                onClick={handleTextFieldClick}
                placeholder="ادخل سعر الذهب عيار 24 اليوم"
              />
            </div>
            <div className="form-group">
              <label>قيمة النصاب</label>
              <input type="text" value={nisaab} disabled onClick={handleTextFieldClick} />
            </div>
              <div className="form-group">
                <label>:المبلغ </label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  onClick={handleTextFieldClick}
                  placeholder=" ادخل قيمة العقارات"
                />
              </div>
              <div className="form-group">
                <button onClick={(e) => { calculatePropertyZakat(); handleTextFieldClick(e); }}>حساب الزكاة</button>
              </div>
            </>
          );
        
      default:
        return null;
    }
  };

  return (
    <div
      className={`card ${showDetails || isHovered ? 'active' : ''}`}
      onClick={toggleDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <div className="icon-container">
          <FaPlus className={`plus-icon ${showDetails ? 'rotate' : ''}`} />
        </div>
        <span className="title">{title}</span>
      </div>
      {showDetails && (
        <div className="details">
          {renderCardContent()}
          {showResult && (
            <>
              <div className="form-group">
                <label style={{fontSize:"22px",color:"#d9a880"}}>مبلغ الزكاة:   <span style={{color:"#fff"}}>{zakatAmount}</span></label>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};


const App = () => {
  return (
    <div className="App">
      <div className='headi'>
      <img src={logo} style={{height:"120px", width:"120px",marginRight:"1120px"}}></img>
      <h1 className="title" style={{textAlign:"right",direction:"rtl",fontSize:"28px"}}>طلب حساب الزكاة</h1>
      </div>
      
      <div className="line"></div>
      <div className="card-container">
        <Card initialTitle="زكاة المال" />
        <Card initialTitle="زكاة الذهب" />
        <Card initialTitle="زكاة الزروع والثمار" />
        <Card initialTitle="زكاة العقار المؤجر " />
      </div>
    </div>
  );
};

export default App;
