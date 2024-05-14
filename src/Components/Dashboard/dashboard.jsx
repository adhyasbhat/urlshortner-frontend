import logo from '../../assets/Images/url-logo.png';
import copy from '../../assets/Images/copy.png';
import cut from '../../assets/Images/cut.png';
import './dashboard.css';
function dashboard() {
  return (
    <>
      <div className="d-flex m-2">
        <div className="logo">
            <img src={logo} className='logoIcon' />
        </div>
        <div className="heading d-flex justify-content-center">
                Shorty Link 
        </div>
      </div>
      <div className='d-grid justify-content-center'>
        <div className="urlDetails d-flex justify-content-center">
            <div>

            <div className='d-flex m-2'>
            <div>
            <input type="text" name="" id="" placeholder='Enter URL name (Optional)' className='urlName p-2' />
            </div>
            <div>
            <input type="text" name="" id="" placeholder='Enter URL here' className='url p-2'/>
            </div>
            <div className='cut'>
            <img src={cut} alt="" className='cutIcon p-2' />
            </div>
            </div>
            <div className="shortenURL d-flex m-2">
                <div className='shortURLValue'></div>
                <div className='copy'>
                <img src={copy} alt="" srcset="" className='copyIcon p-2' />
                </div>
            </div>
            </div>
        </div>
        <div className="prevUrl">
    <div className='text-center m-2 heading2'> Recently Shortened URLs</div>
        </div>
      </div>
    </>
  );
}
export default dashboard;