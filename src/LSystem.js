class Lsystem{
    constructor(){
        this.reset()
    }

    /**
     * Get the sentence, and update it in the view
     */
    generate(){
        this.reset();
        const resultView = document.getElementById("result");
        if (this.getData()) {  // Display the sentence only when the data is valid
            this.sentence = this.getSentence(this.iterations);
            resultView.innerText = this.sentence;
        } else {
            resultView.innerText = "Invalid input";
        }
    }

    /**
     * Clear previous setting
     */
    reset(){
        this.axiom = "";
        this.rules = {};
        this.iterations = 0;
        this.angle = 0;
        this.sentence = "";
    }

    /*
    Read from the inputs, get the axiom, iteration, and non-empty rules
    Assume the user add the rule by sequence
     */
    getData(){
        const form = document.getElementById("parameters");
        const formData = new FormData(form);
        if (formData.get("axiom").match(/^[A-Z\-+]+$/)==null){
            alert("Invalid axiom input. Axiom must be a capitalized letter!");
            return false;
        }
        this.axiom = formData.get("axiom");

        if (formData.get("iterations").match(/^[0-9]+$/)==null){
            alert("Invalid iterations input. Iterations must be a positive number!");
            return false;
        }
        this.iterations = formData.get("iterations");

        const angleInt = parseInt(formData.get("angle"));
        if (isNaN(angleInt)){   // Angle is not an int
            alert("Invalid angle input. Angle must be a number between 0 and 180!");
            return false;
        }

        if (angleInt < 0  || angleInt > 180){   // angle between 0 - 180
            alert("Invalid angle input. Angle must be a number between 0 and 180!");
            return false;
        }

        this.angle = angleInt;

        if (formData.get("rule1") === ""){  // Assume people enter the rule sequentially
            alert("Invalid rule1 input. Rule must be A=XYZ");
            return false;
        }

        if (formData.get("rule1").match(/^[A-Z]=[A-Z+\-\[\]]+/) == null){
            alert("Invalid rule1 input. Rule must be A=XYZ");
            return false;
        }

        let start;
        let end;
        [start, end] = formData.get("rule1").split("=");
        this.rules[start] = end;

        if (formData.get("rule2") === ""){  // Assume people enter the rule sequentially
            return true;
        }
        if (formData.get("rule2").match(/^[A-Z]=[A-Z+\-\[\]]+/) == null) {
            alert("Invalid rule2 input. Rule must be A=XYZ");
            return false;
        }
        [start, end] = formData.get("rule2").split("=");
        this.rules[start] = end;

        if (formData.get("rule3") === ""){  // Assume people enter the rule sequentially
            return true;
        }
        if (formData.get("rule3").match(/^[A-Z]=[A-Z+\-\[\]]+/) == null) {
            alert("Invalid rule3 input. Rule must be A=XYZ");
            return false;
        }
        [start, end] = formData.get("rule3").split("=");
        this.rules[start] = end;
        return true;
    }

    onclick(){
        const button = document.getElementById("generateButton");
        button.addEventListener('pointerup', (e) => {
          console.log("!!");
          this.generate();
        });
        // const formData = $('form').serializeArray();
        // const axiom = formData["axiom"];
        // console.log(formData);
    }

    getNextSentence(currSentence){
        let nextSentence = "";
        for (let char of currSentence){ // Loop through each char in the currSentence
            let rule = this.rules[char];
            if (typeof rule === "undefined"){   // The char does not have a rule
                nextSentence += char;   // Do not change the char
            } else {
                nextSentence += rule;   // Replace the char with the derivation
            }
        }
        console.log(`Next sentence: "${nextSentence}"`);
        return nextSentence;
    }

    getSentence(iters){
        let sentence = this.axiom;
        for (let i = 0; i < iters; i++){
            sentence = this.getNextSentence(sentence);
        }
        return sentence;
    }
}
