
export const setStudent=(values:any)=>{
    const response =  fetch("http://localhost:5000/setStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    return response;

}
export const predict=async(values:any)=>{
    const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    return await response.json();

}