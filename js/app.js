/*////////////////////////// 
        Notifications
//////////////////////////*/

const bell = document.getElementById("bell");
const notificationWrapper = document.getElementById("notifications");
const notifications = notificationWrapper.getElementsByClassName("notification");


// Listen for click on bell to show/hide notifications
bell.addEventListener( "click", () => {
    
    targetClass = "invisible";

    // If notification wrapper is already hidden
    if ( notificationWrapper.classList.contains(targetClass) ) {
        // Show notifications
        notificationWrapper.classList.remove(targetClass);
        let bellWrapper = document.getElementById("bell-wrapper");
        bellWrapper.style.setProperty("--o", "0");
        //Otherwise, hide notifications
    } else {
        notificationWrapper.classList.add(targetClass);
    }
});

// Get hard-coded notifications in index.html and display them
window.addEventListener( "load", () => {
    for ( let i=0; i<notifications.length; i++ ) {
        let notificationCloser = notifications[i].lastElementChild;
        
        // Listen for a click on the 'x' in each notification
        notificationCloser.addEventListener( "click", (e) => {
            let notificationCloser = e.target;
            let notificationInstance = notificationCloser.parentNode;
            let countOfNotifications = notificationWrapper.children.length;
            
            // If the last notification is closed,
            // replace its content with a congratulatory message
            // for the user and remove the 'x'
            if ( countOfNotifications === 1 ) {
                let notificationText = notificationInstance.firstElementChild;
                notificationText.textContent = "Congrats! You're all caught up."
                notificationCloser.remove();
            } else {
            
            // Otherwise just remove the notification
                notificationInstance.remove();
            }
             
        });
    }
});

/*//////////////////// 
        Alerts
///////////////////*/

// Set alert text
const alerts = {
    "demo": "This is an alert. Please read this <em>entire</em> alert message and you will have a great day!",
    "actual": "Seriously, this is a real alert. Don't forget to <em>smile</em> today!"
};

// Select alert wrapper
const alertWrapper = document.getElementById("alert");

// Create an element, give it properties if available and append if a parent is specified
function createElement(elementType, className, innerHTML=null, parentNode=null) {
    let element = document.createElement(elementType);
    element.className = className;
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    if (parentNode) {
        parentNode.appendChild(element);
        return;
    }
    return element;
}

// Add listener to "x" to close alert on user click
function addCloserListener(alertInstance) {
    alertInstance.lastChild.addEventListener("click", (e) => {
        let alertCloserElement = e.currentTarget;
        let alertInstance = alertCloserElement.parentNode;
        let alertCount = alertWrapper.children.length;
        
        // Add class to animate opacity to "0" 
        alertInstance.classList.add("hidden");
        
        // Wait for animation before removing alert and potentially the container
        setTimeout(() => {
            alertWrapper.removeChild(alertInstance);
            
            // If the clicked alert is the last one, hide wrapper
            if (alertCount === 1) {
                alertWrapper.style.display = "none";
            }    
        }, 250);
    });
}

// Create an alert and add it to the wrapper
function instantiateAlert(alertType) {
    
    // Make sure alertWrapper is showing
    alertWrapper.style.display = "block";
    
    // Correct for capitalization issues in alert call
    let typeOfAlert = alertType.toLowerCase();

    // Get alert text based on param
    let alertInnerHTML = alerts[alertType];
    
    // Create alert instance
    let alert = createElement("div", "alert-instance");

    //Create alert title and add it to alert
    let alertTitle = createElement("span", "bold alert-title", "Alert", alert);
    
    // Create alert content from text in alerts object and add it to alert
    let alertContent = createElement("p", "alert-text", alertInnerHTML, alert);

    // Create alert closer and add it to alert
    let alertCloser = createElement("span", "bold close-alert", "&times;", alert);

    // Add event listener to closer
    addCloserListener(alert);

    // Add alert instance to alert wrapper
    alertWrapper.appendChild(alert);
}

// Load window with alerts
window.addEventListener("load", () => {

    instantiateAlert("demo");
    // instantiateAlert("actual");
    
});

/*//////////////////// 
        Charts
///////////////////*/

// Get each canvas element which will become a chart
const ctxLine = document.getElementById("chart-traffic");
const ctxBar = document.getElementById("chart-daily-traffic");
const ctxDonut = document.getElementById("chart-mobile-users");

// Set default values for all charts
Chart.defaults.global.fontColor = "#444";
Chart.defaults.global.fontFamily = "'Work Sans', 'Arial', 'sans-serif'";
Chart.defaults.global.responsive = true;

// Traffic data to be changed dynamically
const trafficData = {
    "Hourly": {
        labels: ["12am-6am","6am-12pm","12pm-6pm","6pm-12am"],
        datasets: [{
            data: [30, 40, 35, 50],
        }]
    },
    "Daily": {
        labels: ["M","T","W","T","F","S","S"],
        datasets: [{
            data: [100, 200, 300, 250, 100, 75, 300],
        }]
    },
    "Weekly": {
        labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
        datasets: [{
            data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250],
        }]
    },
    "Monthly": {
        labels: ["Jan-Feb", "Mar-Apr", "May-Jun", "Jul-Aug", "Sep-Oct", "Nov-Dec"],
        datasets: [{
            data: [7000, 6000, 8500, 4000, 7500, 6250],
        }]
    }
};

// Instantiate traffic chart
const chartTraffic = new Chart(ctxLine, {
    type: 'line',
    data: trafficData["Weekly"],
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: false
                },
                ticks: {
                    beginAtZero: false,
                }
            }],
            yAxes: [{
                gridLines: {
                    offsetGridLines: false
                },
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        elements: {
            line: {
                tension: 0,
                backgroundColor: 'rgba(230, 217, 242, .5)',
                borderColor: 'rgba(153, 102, 204, .8)',
                borderWidth: 1
            },
            point: {
                radius: 5,
                backgroundColor: '#FFF',
                borderColor: 'rgba(153, 102, 204)',
                borderWidth: 2,
                hitRadius: 10,
                hoverRadius: 8,
                hoverBorderWidth: 3,
                hoverBackgroundColor: '#FFF'
            }
        },
        legend: {
            display: false
        },
    }
});

const chartDailyTraffic = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{ 
            data: [50, 75, 150, 100, 200, 175, 75],
            backgroundColor: "#9966CC",
            borderWidth: 0,
            // borderSkipped: "bottom",
            // borderRadius: 30
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 250
                }
            }],
        }
    }
});

const chartMobileUsers = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
        labels: ['Phones', 'Tablets', 'Desktop'],
        datasets: [{
            data: [15, 20, 65],
            backgroundColor: [
                "#009919", // $color-accent-darker
                "#00CC4C", // $color-accent-dark
                "#9966CC", // $color-primary
            ],
            borderWidth: 0
        }]
    },
    options: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 10,
                fontStyle: 'bold'
            }
        },
    }
});



/*/////////////////////////////////////// 
    Temporal nav for traffic chart
///////////////////////////////////////*/

// Get all clickable LIs in an HTMLCollection object
const trafficNavLis = document.getElementById("traffic-nav").children;

// Convert HTMLCollection into an array
const trafficNavLiArray = [].slice.call(trafficNavLis);

// Listen on each click of a traffic nav li
trafficNavLiArray.forEach(li => {
    
    li.addEventListener("click", (e) => {
        
        clickedLi = e.currentTarget;

        // Check to see if clicked li is already selected
        if (!clickedLi.classList.contains("selected")){
            
            trafficNavLiArray.forEach(li => {
            
                // If another li is selected, remove selected class from all lis
                li.classList.remove("selected");
            })
            
            // Add selected class to clicked li
            clickedLi.classList.add("selected");

            // Get li text
            const liText = clickedLi.textContent;

            // Replace existing traffic chart data with
            // data associated with clicked li text
            replaceData(liText);
        }
    })
});

// Replace existing data in trafficChart with data in trafficData object
// corresponding to the textContent of the clicked li and update chart
function replaceData(timeframe) {
    let chart = chartTraffic;
    
    // Get corresponding data from trafficData object
    let boundedTrafficData = trafficData[timeframe];

    // Relplace chart data and labels with timeframe-specific data
    chart.data = boundedTrafficData;

    //Update chart
    chart.update();
}

/*/////////////////////////////////////// 
    User messaging
    (uses 'js/auto-complete.min.js')
///////////////////////////////////////*/

const searchField = document.getElementById('userField');
const messageField = document.getElementById('messageField');
const sendButton = document.getElementById('send');

// Instantiate an autoComplete object to fill
// user search field with employee names
new autoComplete({
    selector: '#userField',
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});

sendButton.addEventListener('click', (e) => {
    // Keep page from refreshing
    e.preventDefault();

    // Harvest any user input
    let userName = searchField.value;
    let message = messageField.value;
    
    // Check to see if there is any input and ask for
    // missing input
    if ( userName === '' && message === '') {

        alert(`Please enter the name of a user and a message.`);
        searchField.focus();

    } else if ( userName === '' ) {

        alert(`Please enter the name of a user.`);
        searchField.focus();

    } else if ( message === '' ) {

        alert(`Please enter a message.`);
        messageField.focus();

    } else {
        // If there is enough input, display confirmation
        // and clear form
        alert(`Message sent to ${userName}.`);
        searchField.value = '';
        messageField.value = '';

    }
});

/*/////////////////////////////////////// 
    Settings
///////////////////////////////////////*/

const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const switches = document.querySelectorAll("input[type='checkbox']");
const emailNotificationSwitch = switches[0];
const publicProfileSwitch = switches[1];
const timezoneSelect = document.getElementById("timezone");

/* Listen for click of the save button
// and store all settings selected by user;
// subsequently notify the user of this action.
*/
saveButton.addEventListener( 'click', (e) => {
    e.preventDefault();
    
    const emailNotification = emailNotificationSwitch.checked;
    const publicProfile = publicProfileSwitch.checked;
    const timezone = timezoneSelect.value;

    window.localStorage.setItem('email', emailNotification);
    window.localStorage.setItem('public', publicProfile);
    window.localStorage.setItem('timezone', timezone);
    alert('All settings have been saved.');
});

/* Listen for a click of the cancel button
 * and erase all saved settings from localStorage;
 * subsequently notify the user of this action.
 */
cancelButton.addEventListener( 'click', (e) => {
    e.preventDefault();

    window.localStorage.clear();
    emailNotificationSwitch.checked = false;
    publicProfileSwitch.checked = false;
    timezoneSelect.value = 0;
    alert('All settings have been reset.');
});

/* When the page is loaded, check to see if
 * localStorage holds values and, if so,
 * call function to retrieve and display settings.
 */
 if ( window.localStorage.length > 0 ) {
    retrieveSettings();
}

/* Cycle through localStorage,
 * retrieve and parse the settings there
 * and display them in settings for the user
 */
function retrieveSettings() {

    /**
     * Return a parsed value from localStorage if available
     * @param {string} storedItem - The key of a key:value pair from localStorage
     * @returns {boolean|number} - Parsed value or false if no value exists
     */
    parseItem = ( storedItem ) => {
        if ( window.localStorage.getItem( storedItem )) {
            return JSON.parse( window.localStorage.getItem( storedItem ));
        } else {
            return false;
        }
    }
    
    const getsEmailNotifications = parseItem( 'email' );
    const hasPublicProfile = parseItem( 'public' );
    const timezone = parseItem( 'timezone' );

    if ( getsEmailNotifications ) {
        emailNotificationSwitch.checked = true;
    }

    if ( hasPublicProfile ) {
        publicProfileSwitch.checked = true;
    }

    if ( timezone ) {
        timezoneSelect.value = timezone;
    }
}