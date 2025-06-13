/// <reference types ='cypress'/>

import data from "../../fixtures/createUser.json";
import { generateRandomData } from "../../support/commands";

describe('PUT API test case',()=>{

    it('TC 1 : Updating user details',()=>{
        let email = `${generateRandomData()}@testmail.com`
        cy.request({
            method : 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization : `Bearer ${data.token}`
            },
            body:{
                "email" : email,
                "name": data.name,
                "gender" : data.gender.male,
                "status": data.status.inactive
            }
        })
        .then((res)=>{
            expect(res.body).to.have.property("email",email)
            expect(res.body).to.have.property("name",data.name)
            expect(res.body).to.have.property("gender",data.gender.male)
            expect(res.body).to.have.property("status",data.status.inactive)            
        })
        .then((res)=>{
            const userId = res.body.id;
            cy.request({
                method : 'PUT',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    Authorization : `Bearer ${data.token}`
                },
                body:{
                    "email" : email,
                    "name": data.name,
                    "gender" : data.gender.female,
                    "status": data.status.active
                }
            })
            .then((res)=>{
                expect(res.body).to.have.property("email",email)
                expect(res.body).to.have.property("name",data.name)
                expect(res.body).to.have.property("gender",data.gender.female)
                expect(res.body).to.have.property("status",data.status.active)      
            })
            .then(()=>{
                cy.request({
                method : 'GET',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    Authorization : `Bearer ${data.token}`
                }
            }).then((res)=>{
                expect(res.body).to.have.property("id",userId)
                expect(res.body).to.have.property("email",email)
                expect(res.body).to.have.property("name",data.name)
                expect(res.body).to.have.property("gender",data.gender.female)
                expect(res.body).to.have.property("status",data.status.active) 
            })
            })
        })
    })

})