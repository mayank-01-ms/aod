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
        return level.level * 100;
    } catch (error) {
        return 100;
    }
}

const setBattery = async () => {
    let level = await getBatteryLevel();
    document.getElementById('battery_level').innerHTML = level + "%";
    document.getElementById('battery_icon_width').style.width = `${level - 10}%`;
}

setBattery();
if(navigator.battery){
    navigator.battery.onlevelchange = setBattery;
}

setInterval(() => {
    document.getElementById('date').innerHTML = new Date().toDateString();
    document.getElementById('time').innerHTML = getTime();
}, 1000);