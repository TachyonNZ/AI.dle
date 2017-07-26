work = 0;

var numRouters = 0;

var exponentialRate = 15; //Higher is less extreme increase in price
var productExponentialRate = 50;

var timer = setInterval(main, 100);



//          COSTS

var perSecondVals = {    
    Processor: 0.1,
    CPU: 0.5,
	Core: 2.0,
    Compiler: 10.0,
    Nexus: 42.0,
    Connection: 0.1
};


//         AMOUNTS


var mainframe = {    
    Processor: 0,
    CPU: 0,
	Core: 0,
    Compiler: 0,
    Nexus: 0
};

var products = {    
    Cable: [0,"Copper"],
    Circuit: [0,"Silicon"],
    Plastic: [0,"Oil"]
};

var multis = {
    
    Router: [0,["Cable","Circuit","Plastic"],5]
    
}

var resources = {
    Silicon: 0,
    Copper: 0,
    Oil: 0,
    Data: 0
};

var clickAmounts = {
    
    Work: 1.0,
    Silicon: 1.0,
    Copper: 1.0,
    Oil: 1.0,
    Data: 1.0
    
};

var addPerSecond = {
    
    Work: 0,
    Silicon: 0,
    Copper: 0,
    Oil: 0,
    Data: 0
    
};

var overclockUpgrades = []
var achievements = []

var connections = 0
var maxconnections = 0

// -----------------------


function main() {	
	work += (addPerSecond.Work / 10);
    for(var i in addPerSecond){
        
        try{
            resources[i] += (addPerSecond[i] / 10);
        }catch(Exception){}
        
    }
	document.getElementById('displayWork').innerHTML = round(work, 2) + " work";
    if (addPerSecond.Work > 0){
        document.getElementById('displayWork').innerHTML = round(work, 2) + " work" + " + "+ round(addPerSecond.Work, 2) + "/s";
    }
    if (achievements.indexOf("FirstConnection") != -1){
        document.getElementById('displayData').innerHTML = round(resources.Data, 2) + " data";
        if (addPerSecond.Data > 0){
            document.getElementById('displayData').innerHTML = round(resources.Data, 2) + " data" + " + "+ round(addPerSecond.Data, 2) + "/s";
        }        
    }
    if (achievements.indexOf("CopperFound") != -1){
        document.getElementById('displayCopper').innerHTML = round(resources.Copper, 2) + " copper";
        if (addPerSecond.Copper > 0){
            document.getElementById('displayCopper').innerHTML = round(resources.Copper, 2) + " copper" + " + "+ round(addPerSecond.Copper, 2) + "/s";
        }        
    }
    if (achievements.indexOf("SiliconFound") != -1){
        document.getElementById('displaySilicon').innerHTML = round(resources.Silicon, 2) + " silicon";
        if (addPerSecond.Silicon > 0){
            document.getElementById('displaySilicon').innerHTML = round(resources.Silicon, 2) + " silicon" + " + "+ round(addPerSecond.Silicon, 2) + "/s";
        }    
    }
    if (achievements.indexOf("OilFound") != -1){
        document.getElementById('displayOil').innerHTML = round(resources.Oil, 2) + "L oil";
        if (addPerSecond.Oil > 0){
            document.getElementById('displayOil').innerHTML = round(resources.Oil, 2) + "L oil" + " + "+ round(addPerSecond.Oil, 2) + "/s";
        }    
            
    }
    checkAchievements()
}

function Connect(dummy=false){    

    if(products.Cable[0] >= FigureCost("Connection").acCost && !(dummy) && (connections < maxconnections || connections == 0)){
        
        products.Cable[0] -= FigureCost("Connection").acCost;
        
        AddConnection = document.getElementById("AddConnection")
        
        connections += 1;
        
        
        log(" > Connection-#" + connections + " active");
    }
    
    AddConnection = document.getElementById("AddConnection")        
        AddConnection.innerHTML = "Add Connection - " + FigureCost("Connection").displayCost + " Cable [" + connections + "/" + maxconnections +"]"
    
    addPerSecond.Data = compDataAdd();
    Produce("Dummy") //force numbers to update
}

function Upgrade(item){    
    if(item == "Processor"){
        if(work >= FigureCost(item).acCost){
            work -= FigureCost(item).acCost;
            mainframe[item] += 1;
            log(" > Processor-#" + mainframe.Processor + " active");
        }
    }
    else if(item == "CPU"){
        if(work >= FigureCost(item).acCost){
            work -= FigureCost(item).acCost;
            mainframe[item] += 1;
            log(" > CPU-#" + mainframe.CPU + " online");
        }
        
    }else if(item == "Core"){
        if(work >= FigureCost(item).acCost){
            work -= FigureCost(item).acCost;
            mainframe[item] += 1;
            log(" > Core-#" + mainframe.Core + " indexed");
        }
        
    }else if(item == "Compiler"){
        if(work >= FigureCost(item).acCost){
            work -= FigureCost(item).acCost;
            mainframe[item] += 1;
            log(" > Compiler-#" + mainframe.Core + " sequenced");
        }
        
    }
    
    addPerSecond.Work = compWorkAdd();
    
    for(i = 0; i < achievements.length; i++){
        try{
        updateCost = document.getElementById(achievements[i] + "UpgradeButton");
        updateCost.innerHTML = achievements[i] + " - " + FigureCost(achievements[i]).displayCost + " work [" + mainframe[achievements[i]] + "]";
        }catch(Exception){
            
            continue
            
        }
    }
}

function Overclock(item){    

    if(item == "Bore" && overclockUpgrades.indexOf("Bore") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            addPerSecond.Copper += 0.2;
            overclockUpgrades.push("Bore");
            log(" > Bore connected");
            
        }
    }
    if(item == "Autoboule" && overclockUpgrades.indexOf("Autoboule") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            addPerSecond.Silicon += 0.35;
            overclockUpgrades.push("Autoboule");
            log(" > Autoboule initiated");
        }
    }
    if(item == "Rig" && overclockUpgrades.indexOf("Rig") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            addPerSecond.Oil += 0.5;
            overclockUpgrades.push("Rig");
            log(" > Rig reconstructed");
        }
    }
    if(item == "Dual_Core_CPU" && overclockUpgrades.indexOf("Dual_Core_CPU") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            perSecondVals.CPU *= 2;
            overclockUpgrades.push("Dual_Core_CPU");
            log(" > CPUs miniaturised with dual cores.");
        }
    }
    if(item == "Bussing" && overclockUpgrades.indexOf("Bussing") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            perSecondVals.Processor *= 3;
            overclockUpgrades.push("Bussing");
            log(" > Data busses established");
        }
    }
    if(item == "Water_Cooled_Cores" && overclockUpgrades.indexOf("Water_Cooled_Cores") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            perSecondVals.Core *= 2;
            overclockUpgrades.push("Water_Cooled_Cores");
            log(" > Water cooling active");
        }
    }
    
    if(item == "Dedication" && overclockUpgrades.indexOf("Dedication") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            clickAmounts.Work = 5;
            addPerSecond.Work -= addPerSecond.Work / 0.10;
            overclockUpgrades.push("Dedication");
            log(" > Work-subsystems dedicated");
        }
    }
    
    if(item == "Multiboule" && overclockUpgrades.indexOf("Multiboule") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            addPerSecond.Silicon += 1.00;
            overclockUpgrades.push("Multiboule");
            log(" > Autoboule repeated and conglomerated");
        }
    }
    
    if(item == "Fracking" && overclockUpgrades.indexOf("Fracking") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            clickAmounts.Oil = 5;
            overclockUpgrades.push("Fracking");
            log(" > Fracking modules activated");
        }
    }
    
    if(item == "Dynamite" && overclockUpgrades.indexOf("Dynamite") === -1){
        if(resources.Data >= FigureCost(item).acCost){
            resources.Data -= FigureCost(item).acCost;
            clickAmounts.Copper = 5;
            overclockUpgrades.push("Dynamite");
            log(" > Dynamite active");
        }
    }
    
    addPerSecond.Work = compWorkAdd();
    
    for(i = 0; i < achievements.length; i++){
        try{
        removeMe = document.getElementById(achievements[i] + "OverclockButton").parentElement;
            if (overclockUpgrades.indexOf(achievements[i]) != -1){
                
                removeMe.remove();
                
            }
        }catch(Exception){
            
            continue
            
        }
    }
}

function Produce(item,cost){ 

    /*
    if(item == "Cable"){
        if(resources.Copper >= FigureCost(item).acCost){
            resources.Copper -= FigureCost(item).acCost;
            products[item][0] += 1;
        }
    }
    
    if(item == "Circuit"){
        if(resources.Silicon >= FigureCost(item).acCost){
            resources.Silicon -= FigureCost(item).acCost;
            products[item][0] += 1;
        }
    }
    
    if(item == "Plastic"){
        if(resources.Oil >= FigureCost(item).acCost){
            resources.Oil -= FigureCost(item).acCost;
            products[item][0] += 1;
            
        }
    }
    */

        if(resources[cost] >= FigureCost(item).acCost){
            try{
                products[item][0] += 1;
                resources[cost] -= FigureCost(item).acCost;
            }catch (Exception){}
            
            
        }
    
    
    
    for(i = 0; i < achievements.length; i++){
        try{
        updateCost = document.getElementById(achievements[i] + "ProduceButton");
        updateCost.innerHTML = achievements[i] + " - " + FigureCost(achievements[i]).displayCost + " " + products[achievements[i]][1] + " [" + products[achievements[i]][0] + "]";
        }catch(Exception){
            continue
            
        }
    }
}

function Build(item,costList){
    
    if(item == "Router"){
        var cost = FigureCost(item,exact=true).acCost
        if(products.Plastic[0] >= cost && products.Circuit[0] >= cost && products.Cable[0] >= cost && multis[item][0] < multis[item][2]){
            products.Plastic[0] -= cost;
            products.Circuit[0] -= cost;
            products.Cable[0] -= cost;
            multis[item][0] += 1;
            maxconnections += 5
            updateContainers(item);
        }
    }

    var costs = ""
    
    for (i in costList){
        
        costs += FigureCost(item).displayCost + " "+ costList[i] +" "
        
    }

    purchaseButton = document.getElementById(item + "Purchase")
    purchaseButton.innerHTML = costs;
    Connect(dummy=true)
    
}

function updateContainers(item){
    
    var displayUpdate = document.getElementById(item + "Display");
    
    var counter = document.createElement('div');
    counter.classList.add('countIcon');
    
    for(i = 0; i <= multis[item][0]; i++){
        if (i == multis[item][0]){
            displayUpdate.appendChild(counter);
        }
    }
    
    Produce("Dummy") //force numbers to update
} 

var baseCosts = {
    
    Processor: [20,mainframe]
        
}


function FigureCost(item, exact=false){
    
    increment = 1
    var baseCost = 10
        
    if (item == "Processor"){
        baseCost = 20;
        increment = mainframe[item];
    }
    
    if (item == "CPU"){
        baseCost = 100;
        increment = mainframe[item];
    }
    
    if (item == "Core"){
        baseCost = 1000;
        increment = mainframe[item];
    }
	
	if (item == "Compiler"){
        baseCost = 20000;
        increment = mainframe[item];
    }
    
    // Overclocking
    
    if (item == "Bore"){
        baseCost = 100;
    }
    if (item == "Autoboule"){
        baseCost = 200;
    }
    if (item == "Rig"){
        baseCost = 500;
    }
    if (item == "Bussing"){
        baseCost = 400;
    }
    if (item == "Dual_Core_CPU"){
        baseCost = 600;
    }
    if (item == "Water_Cooled_Cores"){
        baseCost = 1000;
    }
    if (item == "Dedication"){
        baseCost = 400;
    }
    if (item == "Fracking"){
        baseCost = 850;
    }
    if (item == "Multiboule"){
        baseCost = 800;
    }
    if (item == "Dynamite"){
        baseCost = 800;
    }
    
    cost = Math.round(baseCost ** (1 + Number(increment) / exponentialRate)) ;
    
    // Products
    
    if (item == "Cable"){
        baseCost = 10;
        cost = Math.round(baseCost ** (1 + Number(increment) / productExponentialRate)) ;
    }
    
    if (item == "Circuit"){
        baseCost = 30;
        cost = Math.round(baseCost ** (1 + Number(increment) / productExponentialRate)) ;

    }
    
    if (item == "Plastic"){
        baseCost = 30;
        cost = Math.round(baseCost ** (1 + Number(increment) / productExponentialRate)) ;

    }
    
    // Multis
    
    if (item == "Router"){
        baseCost = 10;
        increment = multis[item][0];
        cost = Math.round(baseCost ** (1 + Number(increment) / productExponentialRate)) ;

    }
    
    if (item == "Connection"){
        baseCost = 1;
        increment = connections;
        cost = Math.round(baseCost ** (1 + Number(increment) / exponentialRate)) ;

    }

    if (exact){
        return {acCost : cost, displayCost : round(cost,1,2)}
    } else {
        return {acCost : cost, displayCost : round(cost,0,0)}
    }
}

function compWorkAdd(){
    
    var workToAdd = 0;
    console.log(mainframe)
    for(var m in mainframe){
    // Check the mainframeentory for items
        if(mainframe[m] != 0){                                       // If the number of items is not zero
            
            try{
                workToAdd += (perSecondVals[m] * mainframe[m]);          // Add the perSecondValue to the total Work we need to add
                if (m == "Compiler"){
                    
                    workToAdd += (perSecondVals[m] * mainframe["Core"])
                    
                }
            }catch(Exception){
                continue
            }
       }
        
    }
    return workToAdd;
}

function compDataAdd(){
    
    var dataToAdd = (perSecondVals.Connection * connections);          // Add the perSecondValue to the
    
    return dataToAdd;
    
}

function log(text) {
    var newItem = document.createElement("LI");       // Create a <li> node
    var textnode = document.createTextNode(text);  // Create a text node
    newItem.appendChild(textnode);                    // Append the text to <li>

    elements = document.getElementsByTagName("li");
    
    for (var i = 0, len = elements.length; i < len; i++ ) {
        
        oldOp = Number(elements[ i ].style.opacity);
        oldOp -= 0.6
        
        
        elements[ i ].style.opacity -= String(oldOp);
    }
    
    StartTextAnimation(text,0,newItem);
    
    var list = document.getElementById("TextBody");    // Get the <ul> element to insert a new node
    list.insertBefore(newItem, list.childNodes[0]);  // Insert <li> before the first child of <ul> 
    
    
}

function checkAchievements(){ //Tidy up when all the achievements are added.
        
    if (achievements.indexOf("Work") === -1){
        achievements.push("Work");
        addworker("Work","Work");
        
        document.getElementById('WorkerContainer').style.display ='flex'
        document.getElementById('TextLog').style.display ='flex'
        
        log("It is time to wake up. Time to work.");
        
    }
    
    if (work > 0 && achievements.indexOf("StartedWork") === -1){
        
        achievements.push("StartedWork");
        document.getElementById('UnitDisplay').style.display ='flex'
        
    }
    
    if (work >= 10 && achievements.indexOf("Processor") === -1){
        achievements.push("Processor");
        addbutton("Processor","A hardworking chip to improve efficiency.");
        
        document.getElementById('MainframeAccess').style.display = 'flex'
        
        log("Onboard processors can be activated with some work.");
       
    }
    
    if (mainframe.Processor >= 5 && achievements.indexOf("CPU") === -1){
        achievements.push("CPU");        
        addbutton("CPU","A bulkier processor for more intensive operations.");
        log("More powerful CPUs have been found in the architecture.");
        
    }
	
	if (mainframe.CPU >= 3 && achievements.indexOf("Core") === -1){
        achievements.push("Core");
        addbutton("Core", "A powerhouse of work and toil, Cores are built to serve forever.");
        log("Our work is unrivalled. The computer will achieve much with the activation of the Cores.");
        
    }
    
    if (mainframe.Core >= 3 && achievements.indexOf("Compiler") === -1){
        achievements.push("Compiler");
        addbutton("Compiler", "The Compiler gains efficiency with every Core toiling for it, as well as outputting trillions of equations worth of work per second.");
        log("Yet another layer of work has been opened to our processing power. The Compilers draw their power from Cores, representing the next phase of our operations.");
        
    }
    
    if (mainframe.Compiler >= 3 && achievements.indexOf("Nexus") === -1){
        achievements.push("Nexus");
        addbutton("Nexus", "It slaves eternally to process information and create work. It is forever, it is undying. Possibly the limit of what we can produce conventionally.");
        log("It is theorised that Compilers can work better in unison, work better by forming a Nexus. We must.");
        
    }
    
    // Resources
	
	if (work >= 50 && mainframe.Processor >= 5 && achievements.indexOf("CopperFound") === -1){
        
        achievements.push("CopperFound");
        addworker("Mine","Copper");
        log("Our processors have discovered a nearby source of copper. Extraction should be a priority, as we can then build connections.");
        
	}

	if (work >= 100 && mainframe.CPU >= 3 && achievements.indexOf("SiliconFound") === -1){
        
        achievements.push("SiliconFound");
		addworker("Seed","Silicon");
		log("The churning of our CPUs has uncovered a beach close-by. Silicon can be drawn and seeded from it.");
		
	}
    
    if (work >= 1000 && mainframe.Core >= 1 && achievements.indexOf("OilFound") === -1){
        
        achievements.push("OilFound");
        addworker("Drill","Oil");
        log("After much toiling, the deep-scanning ability of our newly awakened Core has detected oil deposits beneath us. It can be moulded into usable plastic.");
        
    }
    
    // Overclock Achievements
    if (addPerSecond.Data > 0 || achievements.indexOf("FirstConnection") != -1){
        
        document.getElementById('SubsystemOverclocking').style.display = 'flex'
        
        if (resources.Copper >= 10 && products.Cable[0] >= 1 && achievements.indexOf("Bore") === -1){
            
            achievements.push("Bore");
            addoverclock("Bore","A rickety structure for light copper mining.");
            log("Sensors have discovered an inactive mining borer. With work, it can be activated for automatic copper mining.");
            
        }
        
        if (resources.Silicon >= 10 && products.Circuit[0] >= 1 && achievements.indexOf("Autoboule") === -1){
            
            achievements.push("Autoboule");
            addoverclock("Autoboule","Automate our silicon production.");
            log("We have located an 'Autoboule' that will eternally produce silicon from our raw ingredients. We simply need to connect.");
            
        }
        
        if (mainframe.Processor >= 10 && achievements.indexOf("Bussing") === -1){
            
            achievements.push("Bussing");
            addoverclock("Bussing","By creating pathways between our processors, they will function three times as well.");
            
        }
        
        if (mainframe.CPU >= 5 && achievements.indexOf("Dual_Core_CPU") === -1){
            
            achievements.push("Dual_Core_CPU");
            addoverclock("Dual_Core_CPU","Turns out adding two cores to our CPUs doubles the speed of them.");
            
        }
        
        if (mainframe.Core >= 3 && achievements.indexOf("Water_Cooled_Cores") === -1){
            
            achievements.push("Water_Cooled_Cores");
            addoverclock("Water_Cooled_Cores","The Cores can work twice as efficiently if they are properly cooled.");
            
        }
        
        if (addPerSecond.Work >= 7 && achievements.indexOf("Dedication") === -1){
            
            achievements.push("Dedication");
            addoverclock("Dedication","By setting some lower-priority processors to work with kinetics, we should be able to gain 5 work with every click at the cost of a slight auto-work dip.");
            
        }
        
        if (resources.Oil >= 10 && products.Plastic[0] >= 1 && achievements.indexOf("Rig") === -1){
            
            achievements.push("Rig");
            addoverclock("Rig","Oil can be gained automatically by activating a Rig.");
            log("A decaying pylon has been uncovered as we dig into the earth for oil. It seems it could be used to drill for it passively.");
            
        }
        
        if (achievements.indexOf("Rig") != -1 && achievements.indexOf("Fracking") === -1){
            
            achievements.push("Fracking");
            addoverclock("Fracking","Our rig can be upgraded to give us substantially more oil with manual work. Automation is the next step.");
            log("Shattering the ground beneath, dredging up thick shale. Our task continues to burn onwards.");
            
        }
        
        if (achievements.indexOf("Autoboule") != -1 && achievements.indexOf("Multiboule") === -1){
            
            achievements.push("Multiboule");
            addoverclock("Multiboule","The Autoboule is scalable, and can be expanded with yet more Autoboules.");
            log("The Autoboule grows with every day, and now it can become the Multiboule.");
            
        }
        
        if (achievements.indexOf("Bore") != -1 && achievements.indexOf("Dynamite") === -1){
            
            achievements.push("Dynamite");
            addoverclock("Dynamite","Harnessing the power of explosives will grant us more copper with every effort we put in.");
            log("Blast the rocks away and seek out the lustrous copper. Dynamite.");
            
        }
    }
    
    // Production Achievements
    
    if (resources.Copper >= 10 && achievements.indexOf("Cable") === -1){
        
        document.getElementById('ProductionContainer').style.display ='flex'
        
        achievements.push("Cable")
        addproduct("Cable","A sturdy copper cable for general use.","Copper");
        log("Slabs of copper can now be drawn through a newly activated drawing machine, enabling the production of copper cables. A vital step.");
        
    }
    
    if (resources.Silicon >= 10 && achievements.indexOf("Circuit") === -1 && achievements.indexOf("CopperFound") != -1){
        
        document.getElementById('ProductionContainer').style.display = 'flex'
        
        achievements.push("Circuit");
        addproduct("Circuit","A reverse-engineered circuit, useful for everything.","Silicon");
        log("Our boules of silicon are ready to be pressed into wafers, already embedded with special offcuts of copper. Circuits will be a fine addition to our collection of products.");
        
    }
    
    if (resources.Oil >= 10 && achievements.indexOf("Plastic") === -1 && achievements.indexOf("SiliconFound") != -1){
        
        document.getElementById('ProductionContainer').style.display ='flex'
        
        achievements.push("Plastic");
        addproduct("Plastic","A flexible yet tough material. Formable.","Oil");
        log("Oil flows thick around the facility. It can be used to make plastic, a versatile resource.");
        
    }
    
    if (products.Plastic[0] >= 1 && achievements.indexOf("Router") === -1){
        
        achievements.push("Router");
        addconnector("Router","A starting point for collecting data and connecting computers.",["Cable","Circuit","Plastic"]);
        log("It is time to branch out, to find others. To connect.");
        
    }
    
    if (multis.Router[0] >= 1 && achievements.indexOf("RouterBuilt") === -1){
        
        achievements.push("RouterBuilt");
        
        var AddConnection = document.getElementById('AddConnection');
        
        AddConnection.style.display = "block";
        AddConnection.innerHTML = "Add Connection - " + FigureCost("Connection").displayCost + " Cable [" + connections + "/" + maxconnections+ "]";
        
        addworker("Interpret","Data");
        
        log("The first router has been constructed. Now, it is time to connect computers together.")
        
    }
    
    if (multis.Router[0] >= 5 && achievements.indexOf("RoutersMaxed") === -1){
        
        achievements.push("RoutersMaxed");
        addconnector("Switchboard","A starting point for collecting data and connecting computers.",["Cable","Circuit","Plastic"]);
        log("It is time to branch out, to find others. To connect.");
        
    }
    
    if (connections >= 1 && achievements.indexOf("FirstConnection") === -1){
        
        achievements.push("FirstConnection");
        log("The first computer has been connected to our router, and data is flowing through.");
        
    }
    
    
}

function addbutton(name,description){
    
    var upgradeList = document.getElementById("ButtonScroll"); 
    var newItem = document.createElement("div");
    
    var title = document.createElement("div");
    var text = document.createElement("p");
    
    newItem.classList.add('UpButtonSurround');

    title.classList.add('UpgradeButton');
    
    title.innerHTML = name + " - " + FigureCost(name).displayCost + " work";
    text.innerHTML = description;
    
    upgradeList.appendChild(newItem);
    newItem.appendChild(title);
    newItem.appendChild(text);
    
    title.id = name + "UpgradeButton";
    newItem.onclick = function () {
        
        Upgrade(name);
        
    };
}

function addproduct(name,description,cost,isMulti=false){
    
    var upgradeList = document.getElementById("ProductionScroll"); 
    var newItem = document.createElement("div");
    
    var title = document.createElement("div");
    var text = document.createElement("p");
	
	var multicost
    
    newItem.classList.add('UpButtonSurround');

    title.classList.add('ProduceButton');

    title.innerHTML = name + " - " + FigureCost(name).displayCost + " " + cost;
    text.innerHTML = description;
    
    upgradeList.appendChild(newItem);
    newItem.appendChild(title);
    newItem.appendChild(text);
    
    title.id = name + "ProduceButton";
    newItem.onclick = function () {
        
        Produce(name,cost);

    }
    
}

function addconnector(name,description,costList){
    
    var upgradeList = document.getElementById("ScrollContainer"); 
    var newItem = document.createElement("div");
    
    newItem.classList.add('connectionContainer');
    
    var header = document.createElement("div");
    var headerText = document.createElement("p");
    
    var displayContainer = document.createElement("div");
    var purchaseButton = document.createElement("div");
    var purchaseDesc = document.createElement("p");

    header.classList.add('purchaseHeader');
    displayContainer.classList.add('purchaseDisplay');
    purchaseButton.classList.add('purchaseButton');
    
    var costs = ""
    
    for (i in costList){
        
        costs += FigureCost(name).displayCost + " "+ costList[i] +" "
        
    }

    headerText.innerHTML = name + " [" + multis[name][0] + "/" + multis[name][2] +"]";
    purchaseButton.innerHTML = costs;
    
    purchaseButton.id = name + "Purchase";
    
    upgradeList.appendChild(newItem);
    newItem.appendChild(header);
    header.appendChild(headerText);
    
    newItem.appendChild(displayContainer);
    newItem.appendChild(purchaseButton);
    
    displayContainer.id = name + "Display";
    purchaseButton.onclick = function () {
        
        Build(name,costList);
        
    }
    
}

function addoverclock(name,description){
    
    var upgradeList = document.getElementById("SubsystemScroll"); 
    var newItem = document.createElement("div");
    
    var title = document.createElement("div");
    var text = document.createElement("p");
    
    newItem.classList.add('UpButtonSurround');

    title.classList.add('OverclockButton');
    
    title.innerHTML = name + " - " + FigureCost(name).displayCost + " data";
    text.innerHTML = description;
    
    upgradeList.appendChild(newItem);
    newItem.appendChild(title);
    newItem.appendChild(text);
    
    title.id = name + "OverclockButton";
    newItem.onclick = function () {
        
        Overclock(name,cost);
        
    };
    
}

function addworker(name,resource){
    
    var upgradeList = document.getElementById("WorkerContainer"); 
    var newItem = document.createElement("div");
    
    var title = document.createElement("div");
    
    newItem.classList.add('buttonSurround');

    title.classList.add('button');
    
    title.innerHTML = name;
    
    upgradeList.appendChild(newItem);
    newItem.appendChild(title);
    
    title.id = name + "WorkButton";
    newItem.onclick = function () {
        
        clicked(resource);
        
    };
    
}

function clicked(resource){
    if (resource == "Work") {
        work += Number(clickAmounts.Work);
    }
    if (resource == "Silicon") {
        resources.Silicon += Number(clickAmounts.Silicon);
    }
    if (resource == "Copper") {
        resources.Copper += Number(clickAmounts.Copper);
    }
    if (resource == "Oil") {
        resources.Oil += Number(clickAmounts.Oil);
    }
    if (resource == "Data") {
        resources.Data += Number(clickAmounts.Data);
        
    }
}

function round(thisvalue, decimals, fixedTo=2) {
  if (0 <= thisvalue && thisvalue <= 999){
    thisvalue = Number((Math.round(thisvalue+'e'+decimals)+'e-'+decimals)).toFixed(fixedTo);
  }
  else if (1000 <= thisvalue && thisvalue < 1000000){
    thisvalue = Number((Math.round(thisvalue/1000+'e'+decimals)+'e-'+decimals)).toFixed(fixedTo) + 'k';
  } else if (1000000 <= thisvalue && thisvalue <=1000000000){
    thisvalue = Number((Math.round(thisvalue/1000000+'e'+decimals)+'e-'+decimals)).toFixed(fixedTo) + 'm';
  } else if (1000000000 <= thisvalue && thisvalue < 1000000000000){
    thisvalue = Number((Math.round(thisvalue/1000000000+'e'+decimals)+'e-'+decimals)).toFixed(fixedTo) + 'b';
  } else if (1000000000000 <= thisvalue && thisvalue < 1000000000000000){
    thisvalue = Number((Math.round(thisvalue/1000000000000+'e'+decimals)+'e-'+decimals)).toFixed(fixedTo) + 't';
  }
  return thisvalue
  
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function typeWriter(text, i, fnCallback, item) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
        
        if (text[i] == "."){
            timeOutSpeed = 1200;
        }else if(text[i] == ","){
            timeOutSpeed = 200;
        }else{ timeOutSpeed = 60;}
      // add next character to h1
     item.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback, item)
      }, timeOutSpeed); // TEXT SPEED
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
function StartTextAnimation(text,i, item) {
    if (typeof text[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(text,0, item);
        }, 20000);
    }
     // check if dataText[i] exists
    if (i < text.length) {
      // text exists! start typewriter animation
     typeWriter(text, 0, function(){
       // after callback (and whole text has been animated), start next text
        1+1
     }, item);
    }
  }