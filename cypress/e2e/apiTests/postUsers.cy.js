/// <reference types="cypress"/>

// Fixed data to be passed from fixture , using the following line
import userData from "../../fixtures/createUser";
import { generateRandomData } from "../../support/commands";

describe('POST users API tests',()=>{
    let randomEmail="";

    it('TC 1 : Create User',()=>{    
        randomEmail=`${generateRandomData()}@TestMail.com`;

        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v2/users',
            headers : {
                Authorization : `Bearer ${userData.token}`
            },
            body :
            {
                "email" : randomEmail,
                "name": userData.name,
                "gender" : userData.gender.male,
                "status": userData.status.active  
            }
        }).then((response)=>{
            /*
            cy.log(response)        // Output : Object{9}
            cy.log(JSON.stringify(response))    // Will print the exact API response in JSON instead of above
            */

            // Assertions
            // assertion directly asserting value by passing the key
            expect(response.body.email).eq(randomEmail)  
            expect(response.body.name).eq(userData.name)  
            expect(response.body.gender).eq(userData.gender.male)  
            expect(response.body.status).eq(userData.status.active)   
            
            // assertion asserting the property as well as value
            expect(response.body).to.have.property("email",randomEmail)
            expect(response.body).to.have.property("name",userData.name)
            expect(response.body).to.have.property("gender",userData.gender.male)
            expect(response.body).to.have.property("status",userData.status.active)
        }).then((response)=>{
            // API CHAINING
            // Verifying ID by hitting GET API to check whether and checking response
            const createdUserID = response.body.id

            cy.request({
                method : 'GET',
                url : `https://gorest.co.in/public/v2/users/${createdUserID}`,
                headers : {
                    Authorization : `Bearer ${userData.token}`
                }
            }).then((response)=>{
                expect(response.body).to.have.property("email",randomEmail)
                expect(response.body).to.have.property("id",createdUserID)
                expect(response.body).to.have.property("name",userData.name)
                expect(response.body).to.have.property("gender",userData.gender.male)
                expect(response.body).to.have.property("status",userData.status.active)  
            })

        })
    })

})