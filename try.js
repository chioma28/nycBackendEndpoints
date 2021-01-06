const { businessName,email,password} = req.body;
    let sql = `SELECT * FROM users WHERE businessName = '${username}' OR email = '${email}' `;
    connection.query(sql, (err, resp) => {
        if (err) { return res.status(422).json({message : err.sqlMessage}); }
        if (resp.length > 0) {
            if (businessName === resp[0].businessName) {
                return res.status(422).json({message : "Duplicate Business name!"});
            } else if (email === resp[0].email) {
                return res.status(422).json({message : "Duplicate Email!"});
            }
        } else {
            bcrypt.hash(password, 10, (errHash, hash) => { 
                if (errHash) { return res.status(422).json({message : err}); }
                const  otpCode = Math.floor(100000 + Math.random() * 900000);
                let sql2 = `INSERT INTO users (businessName, email, password, OTP) 
                        VALUES ('${buinessName}', '${email}', '${hash}', '${otpCode}')`;
                connection.query(sql2, (err2, resp2) => {
                    if (err2) { return res.status(422).json({message : err2.sqlMessage}); }
                    if (resp2) {    
                        const newUserID = encodeURIComponent(Buffer.from(`${resp2.insertId}`, 'binary').toString('base64'));
                        const secretCode = encodeURIComponent(Buffer.from(`${otpCode}`, 'binary').toString('base64'));
                        //SEND MAIL TEMPLATE
                        //sendMail = (name, email, subject, text, to, cb)
                        sendMail(
                            'naija-yellow-catalogue',
                            'noreply@naija-yellow-catalogue.com',
                            'User Registration Successful! Please, you need to Activate Your Account!',
                            `Hi ${businessName.split(" ")[0]}!, <br/>
                            <p>Welcome to <b>Naija Yellow Catalogue</b>, you are one click away from showcasing your business to the world!. Click on the button below to activate your account.</p>
                            <center><a href="${process.env.BASE_URL}/users/signup/${newUserID}/${secretCode}"><button style="padding: 12px; color: white; background: #FFC72C; border: none; border-radius: 5px; border-shadow: 1px 2px 8px 1px">Activate My Account</button></a></center> 
                            <p>Or Copy the link below to your browser:<br/>
                            <a href="${process.env.BASE_URL}/users/signup/${newUserID}/${secretCode}">${process.env.BASE_URL}/users/signup/${newUserID}/${secretCode}}</a></p>
                            <br/>Thanks.`, 
                            email,
                            (err3, info) => {
                                if (err3) { return res.status(500).json({ message: 'Internal Error' }); }
                                res.status(201).json({message : 'Signup Sucessful! Please, check your mail and activate your account!'})
                        });
                    }
                });
            });
        }
    });



    ////////////////////////////////////////////////////////////////********************* */
    const { roleId,businessName,email,password} = req.body;
    let sql = `SELECT * FROM users WHERE businessName =  email = '${email}' `;
    connection.query(sql, (err, resp) => {
        if (err)  return res.status(422).send(err); 
        if (resp.length > 0) {
             if (email === resp[0].email) {
                return res.status(422).send("Duplicate Email!");
            }
        } else {
            bcrypt.hash(password, 10, (errHash, hash) => { 
                if (errHash)  return res.status(422).send(errHash);
                const  otpCode = Math.floor(100000 + Math.random() * 900000);
                let sql2 = `INSERT INTO users (roleId,businessName, email, password, OTP) 
                        VALUES ('${roleId}','${businessName}', '${email}', '${hash}', '${otpCode}')`;
                        console.log(roleId,businessName,email,otp,passwo)
                connection.query(sql2, (err2, resp2) => {
                    if (err2) { return res.status(422).json({message : err2.sqlMessage}); }
                    if (resp2) {    
                        const newUserID = encodeURIComponent(Buffer.from(`${resp2.insertId}`, 'binary').toString('base64'));
                        const secretCode = encodeURIComponent(Buffer.from(`${otpCode}`, 'binary').toString('base64'));
                        console.log(newUserID, secretCode)
                        //SEND MAIL TEMPLATE
                        //sendMail = (name, email, subject, text, to, cb)
                        sendEmail(
                            'naija-yellow-catalogue',
                            'noreply@naija-yellow-catalogue.com',
                            'User Registration Successful! Please, you need to Activate Your Account!',
                            `Hi ${businessName.split(" ")[0]}!, <br/>
                            <p>Welcome to <b>Naija Yellow Catalogue</b>, you are one click away from showcasing your business to the world!. Click on the button below to activate your account.</p>
                            <center><a href="${process.env.BASE_URL}/users/signup/activation/${newUserID}/${secretCode}"><button style="padding: 12px; color: white; background: #FFC72C; border: none; border-radius: 5px; border-shadow: 1px 2px 8px 1px">Activate My Account</button></a></center> 
                            <p>Or copy and paste the link below on your browser:<br/>
                            <a href="${process.env.BASE_URL}/users/signup/activation/${newUserID}/${secretCode}">${process.env.BASE_URL}/users/signup/activation/${newUserID}/${secretCode}}</a></p>
                            <br/>Thanks.`, 
                            email,
                            (err3, info) => {
                                if (err3) return res.status(500).send('Internal Error');
                                res.status(201).send('Signup Successful! Please, check your mail and activate your account!')
                        });
                    }
                });
            });
            
        }
    });



    //forget and reset password

    // RESET PASSWORD FOR USER
const resetPassword = (req, res, next) => {
    const { login } = req.body;
    if (!login) { return res.status(404).json({ message: 'Invalid Credential Supplied!' }); }
    let sql = `SELECT * FROM users WHERE username = '${login}' OR  phone = '${login}' OR  email = '${login}'`;
    connection.query(sql, (err, identifiedUser) => {
        if (err) { return res.status(422).json({message : err2.sqlMessage}); }
        if (identifiedUser.length > 0) {
            const otpCode = Math.floor(100000 + Math.random() * 900000);
            connection.query(`UPDATE users SET OTP = ${otpCode} WHERE ID = ${identifiedUser[0].ID}`, (err2, resp) => {
                const newUserID = encodeURIComponent(Buffer.from(`${identifiedUser[0].ID}`, 'binary').toString('base64'));
                const secretCode = encodeURIComponent(Buffer.from(`${otpCode}`, 'binary').toString('base64'));    
                //SEND MAIL TEMPLATE
                //sendMail = (name, email, subject, text, to, cb)
                sendMail(
                    'i2talk',
                    'noreply@i2talk.com',
                    'Request to Reset Password, i2talk Account!',
                    `Hi ${identifiedUser[0].fullName.split(" ")[0]}, <br/>
                    <p>A request was initiated to reset your password. Click on the button below to reset your account password.</p>
                    <center><a href="${process.env.BASE_URL}/api/users/auth/reset/${newUserID}/${secretCode}"><button style="padding: 12px; color: white; background: #000066; border: none; border-radius: 6px;">Reset Password</button></a></center> 
                    <p>Or Copy the link below to your browser:<br/>
                    <a href="${process.env.BASE_URL}/api/users/auth/reset/${newUserID}/${secretCode}">${process.env.BASE_URL}/api/users/auth/activation/${newUserID}/${secretCode}}</a></p>
                    <br/>
                    Please, ignore and delete this mail if you did not make the request! Thanks.`, 
                    identifiedUser[0].email,
                    (err3, info) => {
                        if (err3) { return res.status(500).json({ message: 'Internal Error' }); }
                        res.status(201).json({message : 'Password reset link sent. Check your mail and reset your password!'})
                });    
            });
        } else {
            return res.status(404).json({ message: 'No Account found for user!' }); 
        }
    });
}

// GET RESET PASSWORD
const getResetPassword = (req, res, next) => {
    var { userID, otpCode } = req.params;

    // DECODE URI COMPONENT
    const decodedUserID = decodeURIComponent(userID);
    const decodedOtpCode = decodeURIComponent(otpCode);

    // DECODE BASE64 TO GET THE RAW DATA
    userID = Buffer.from(decodedUserID, 'base64').toString();
    otpCode = Buffer.from(decodedOtpCode, 'base64').toString();

    connection.query(`SELECT email, OTP FROM users WHERE ID = ${userID}`, (err, resp) => {
        if (err) { return res.status(422).json({message : err2.sqlMessage}); }
        if (resp.length > 0) {
            if (resp[0].OTP == otpCode) {
                return res.status(200).json({ userID : userID, status : "Verified" })
            } else {
                return res.status(401).json({message : 'Error reseting passowrd! Check Reset Link Again'})
            }
        } else {
            return res.status(404).json({message : 'No account found! Check Reset Link Again'})
        }
    });
}
