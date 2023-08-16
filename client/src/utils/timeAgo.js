function formatTimeAgo(timestamp) {
    const currentTime = new Date();
    const previousTime = new Date(timestamp);
  
    const timeDifference = Math.abs(currentTime - previousTime);
    const minutesDifference = Math.floor(timeDifference / 1000 / 60);
  
    if (minutesDifference < 60) {
      return minutesDifference > 1 ? `${minutesDifference} phút` : '1 phút';
    }
  
    const hoursDifference = Math.floor(minutesDifference / 60);
    if(hoursDifference < 24){
      return hoursDifference > 1 ? `${hoursDifference} giờ` : '1 giờ';
    }else if(hoursDifference < 47){
      return '1 ngày trước'
    }else{
      return previousTime.getDay() + ' ngày trước'
    }
}

export default formatTimeAgo