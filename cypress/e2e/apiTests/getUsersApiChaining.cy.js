/// <reference types = 'cypress' />

describe('GET users : API Chaining',()=>{
    let token ='ad15584be400be0b41d820a26fe4fa0df9443fb90ac379fe60c037c3f089e0d5';
    /* 
        Fetching all users , then saving id of the user at the first position and hitting api with the
        saved id and validating the response 
    */
    it('GET information of all users',()=>{
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res)=>{
            let userID = res.body[0].id;
            return userID;
        })
        .then((userID)=>{
            cy.request({
            method : 'GET',
            url : `https://gorest.co.in/public/v2/users/${userID}`,
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res)=>{
            expect(res.body).to.have.property("id",userID)
        })
        })
    })

    /* 
        Fetching entire API response , then hitting get user API with each id fetched from previous API
        response and validating the id
    */
    it('GET information of all users and validating responses of all',()=>{
        cy.request({
            method:'GET',
            url:'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((resp)=>{
            let usrArr = resp.body;
            return usrArr;
        })
        .then((usrArr)=>{
            for(let i=0;i<usrArr.length;i++){
                cy.request({
                    method:'GET',
                    url:`https://gorest.co.in/public/v2/users/${usrArr[i].id}`,
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                })
                .then((resp)=>{
                    expect(resp.body).to.have.property("id",usrArr[i].id)
                })
            }
        })
    })

})