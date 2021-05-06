const getTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = hours + `<span class="blink">:</span>` + minutes;
    return time;
}

const getBatteryLevel = async () => {
    try {
        let level = await navigator.getBattery();
        return Math.round(level.level * 100);
    } catch (error) {
        return 100;
    }
}

const setBattery = async () => {
    let level = await getBatteryLevel();
    document.getElementById('battery_level').innerHTML = level + "%";
    document.getElementById('battery_icon_width').style.width = `${level - 10}%`;
}

setInterval(() => {
    document.getElementById('date').innerHTML = new Date().toDateString();
    document.getElementById('time').innerHTML = getTime();
}, 1000);

const createChargingBubbles = () => {

    for(let i = 0; i < 25; i++){
        let div = document.createElement('div');
        div.classList.add('charging_bubble');
        
        let dimension = 7 + Math.random() * 5 + 'px';
        let top = 1 + Math.random() * 35 + 'vh'; //CSS VALUES
        let left = 1 + Math.random() * 10 + 'vh';

        div.style.width = dimension;
        div.style.height = dimension;
        div.style.top = top;
        div.style.left = left;
        div.style.animationDelay = Math.round(1 - Math.random() * 15) + 's';

        document.querySelector('.charging_animation').append(div);
    } 

}

const chargingListener = async () => {
    try{
        const Battery = await navigator.getBattery();
        
        //If the page is loaded then check for charging
        if(Battery.charging){
            document.querySelector('body').classList.add('charging');
            createChargingBubbles();
        } else{
            document.querySelector('body').classList.remove('charging');
        }
        
        
        // Page is loaded and then check for charging change event
        Battery.addEventListener('chargingchange', () => {
            if(Battery.charging){
                document.querySelector('body').classList.add('charging');
                createChargingBubbles();
            } else{
                document.querySelector('body').classList.remove('charging');
            }
        });

    }catch(e){
        console.log(e);
    }
}

//Checking for battery change
const levelChangeListener = async () => {
    const Battery = await navigator.getBattery();
    Battery.addEventListener('levelchange', () => {
        setBattery();
    });
}

if(navigator.getBattery){
    setBattery();
    chargingListener();
    levelChangeListener();
}