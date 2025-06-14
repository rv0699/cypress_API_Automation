/// <reference types='cypress' />

import userData from "../../fixtures/createUser.json"
import {generateRandomData} from "../../support/commands"

describe('DELETE API test cases',()=>{
     it('TC 1 : Create and Delete user',()=>{
        let randomEmail = `${generateRandomData()}@mail.com`;
        let userId;
        
        // POST API to create user
        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users',
            headers:{
                Authorization : `Bearer ${userData.token}`
            },
            body:{
                "email" : randomEmail,
                "name": userData.name,
                "gender" : userData.gender.male,
                "status": userData.status.inactive                  
            }
        }).then((response)=>{
            // Asserting user creation
            expect(response.status).eq(201)
            expect(response.body).to.have.property("email",randomEmail)
            expect(response.body).to.have.property("name",userData.name)
            expect(response.body).to.have.property("gender",userData.gender.male)
            expect(response.body).to.have.property("status",userData.status.inactive)
        }).then((response)=>{
            userId = response.body.id;
            cy.log(`userID :${userId}`);
            // DELETE API to delete user
            cy.request({
                method:'DELETE',
                url:`https://gorest.co.in/public/v2/users/${userId}`,
                headers:{
                    Authorization : `Bearer ${userData.token}`
                }
            }).then((res)=>{
                // Aserting delete status
                expect(res.status).eq(204)
            }).then(()=>{
            cy.request({
                // GET API to validate user does not exist
                method:'GET',
                url:`https://gorest.co.in/public/v2/users/${userId}`,
                headers:{
                    Authorization : `Bearer ${userData.token}`
                },
                // Added following parameter so that test case does not fail on status codes other
                // than 2xx and 3xx
                failOnStatusCode: false
            }).then((response)=>{
                // Asserting response status and message in response body
                expect(response.status).eq(404)
                expect(response.body.message).to.contain("Resource not found")
            })
        })
        })
     })
})