import axios from "axios";
import { useState } from "react";
import style from "./Home.module.css";

function Home()
{
    const [data,alterdata]=useState({tenure:0,contract_encoded:"",monthly_charges:0,internet_encoded:"",payment_encoded:""})
    const [value,altervalue]=useState({});

    const changeContent=(e)=>
    {
        const {name,value}=e.target;
        alterdata({...data,[name]:value});
    }

    const upload=async(e)=>
    {
        e.preventDefault();
        try {
            const response=await axios.post("https://detect-churn.onrender.com/predict/",data);
            altervalue(response.data);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }
    return(
        <>
            <h2 className={style.head}>Churn-Predict</h2>
            <form>
                <label className={style.tenure} htmlFor="tenure">Enter the tenure (in months) :</label><br />
                <input className={style.tenureinput} type="number" name="tenure" required onChange={changeContent}/><br /><br />

                <label className={style.contract} htmlFor="contract">Choose the contract :</label><br />

                <div className={style.div1}>
                    <input type="radio" name="contract" value="Month-to-month" required onChange={changeContent} />
                    <label className={style.option}>Month-to-month</label>

                    <input type="radio" name="contract" value="One year" required onChange={changeContent} />
                    <label className={style.option}>One year</label>

                    <input type="radio" name="contract" value="Two year" required onChange={changeContent} />
                    <label className={style.option}>Two year</label><br /><br />
                </div>

                <label className={style.charges} htmlFor="charges">Enter the monthly charges :</label><br />
                <input className={style.chargesinput} type="number" name="monthly_charges" onChange={changeContent} required/> <br /><br />

                <label className={style.internet} htmlFor="service">Choose the internet service :</label><br />

                <div className={style.div2}>
                    <input type="radio" name="internet_service" value="DSL" onChange={changeContent} required />
                    <label className={style.option}>DSL</label>

                    <input type="radio" name="internet_service" value="Fiber optic" onChange={changeContent} required />
                    <label className={style.option}>Fiber optic</label>

                    <input type="radio" name="internet_service" value="No" onChange={changeContent} required />
                    <label className={style.option}>No</label><br /><br />
                </div>

                <label className={style.payment} htmlFor="payment">Choose the payment method :</label><br />
                
                <div className={style.div3}>
                    <input type="radio" name="payment_method" value="Bank transfer (automatic)" onChange={changeContent} required />
                    <label className={style.option}>Bank transfer (automatic)</label>

                    <input type="radio" name="payment_method" value="Credit card (automatic)" onChange={changeContent} required />
                    <label className={style.option}>Credit card (automatic)</label>

                    <input type="radio" name="payment_method" value="Electronic check" onChange={changeContent} required />
                    <label className={style.option}>Electronic check</label>

                    <input type="radio" name="payment_method" value="Mailed check" onChange={changeContent} required />
                    <label className={style.option}>Mailed check</label>
                </div>

                <input className={style.input} type="submit" value="Check" onClick={upload} />
            </form>

            <h2 className={style.output}>Churn : {value.churn}</h2>
        </>
    )
}

export default Home;