const { count } = require('console')
const { validateHeaderName } = require('http')
const { exit } = require('process')
const readline = require('readline')

class AdvancedCalc{

    addition(num1, num2){
        return num1 + num2
    }
    subtraction(num1, num2){
        return num1 - num2
    }
    muiltiplication(num1, num2){
        return num1 * num2
    }
    division(num1, num2){
        if(num2 == 0){
            throw new Error("Not divisible by Zero!")
        } else {
            return num1 / num2
        }
    }
    square(num){
        return this.power(num,2)
    }
    factorial(num){
        var result = num
        if(num === 0 || num === 1){
            return 1
        }
        for(var n = num-1; n>1; n--){
            result = result * n
        }
        return result
    }
    power(base, exponent){
        let value = base;
        if (base === 0 && exponent < 0) {
            return "Error: Division by zero"
        }
        if(exponent < 0){
            for(let i=1; i<(-1*exponent); i++){
                value = value * base
            }
            return 1/value
        }else if(exponent == 0){
            return 1
        }else{
            for(let i=1; i<exponent; i++){
                value = value * base
            }
            return value
        }
    }
    simple_interest(p,r,t){
        return (p*r*t)/100
    }
    compound_interest(p,r,n,t){
        return p*(1+(r/n))**(n*t)
    }
    square_root(s){
        let value = s
        while(Math.abs(value * value - s) > 0.0001){
            value = (value+(s/value))/2
        }
        return value
    }
    nth_root(s,n){
        if(n === 0){
            console.log("Error: Zero'th root doesnt Exist!")
            return
        }
        let value = s
        while(Math.abs(this.power(value, n) - s) > 0.0001){
            value = ((n-1)*value+(s/this.power(value, n-1)))/n
        }
        return value
    }
    

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.operations = {
            1: (num1, num2) => this.addition(num1,num2),
            2: (num1, num2) => this.subtraction(num1,num2),
            3: (num1, num2) => this.muiltiplication(num1,num2),
            4: (num1, num2) => this.division(num1, num2),
            5: (num) => this.square(num),
            6: (num) => this.factorial(num),
            7: (base, exponent) => this.power(base,exponent),
            8: (p,r,t) => this.simple_interest(p,r,t),
            9: (p,r, n, t) => this.compound_interest(p,r,n,t),
            10: (s) => this.square_root(s),
            11: (s, n) => this.nth_root(s,n),
        }
    }

    ask(query){
        return new Promise(resolve => {
            this.rl.question(query, ans => {
                resolve(ans)
            })
        })
    }

    async getNumbers(input){
        const result = []
        const labels = Array.isArray(input) ? input : Array(input).fill(null).map((_,i) => i+1)
        for(let label of labels){
            typeof(label) == "number" ? label = "number " + label : label
            let value = parseFloat(await this.ask(`Enter your ${label}: `))
            result.push(value)
        }
        return result
    }

    async start(){
        try{
            console.log("Welcome to the Advanced Calculator!")
            const operator = await this.ask("Enter your Operation(1 - 9)\n 1.Addition\n 2.Subtraction\n 3.Muiltiplication\n 4.Division\n 5.Square\n 6.Factorial\n 7.Find_Power\n 8.Simple_Interest\n 9.Compound_Interest\n 10.Square_Root\n 11.nth_root\n : ")
            if(operator == "###"){
                process.exit(0)
            }
            let count;
            switch(operator){
                case "5":
                case "6":
                case "10":
                    count = 1
                    break;
                case "7":
                    count = ["base", "exponent"]
                    break;
                case "8":
                    count = ["principal", "rate", "time"]
                    break;
                case "9":
                    count = ["principal", "rate", "frequency", "time"]
                    break;
                default:
                    count = 2
            }
            if(this.operations[operator]){
                const num = await this.getNumbers(count)
                console.log("Your Output is: ",this.operations[operator](...num))
            }else{
                console.log("choose between 1-11 and try again!")
            }
        } catch(err) {
            console.log(err.message)
        } finally {
            this.rl.close()
        }
    }
}

const calculator = new AdvancedCalc
calculator.start()