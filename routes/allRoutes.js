

const db = require('.././config/sql').connect();

module.exports = (app) => {
    //viser alle produkter når siden loades

    app.get('/', function (req, res) {
        db.query(`
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
        FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id)
            `, (error, rows) => {
                db.query('SELECT * FROM kategori', function (err, data_kategori) {
                    res.render('pages/index', {
                        side: "index",
                        arrangement: rows,
                        kategori: data_kategori
                    });
                })
            });
    });

    app.get('/arrangement', function (req, res) {
        db.query(`
            SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
            FROM(( arrangement AS a
                INNER JOIN kategori AS k
                ON fk_kategori = k.kategori_id)
                INNER JOIN event AS e
                ON e.fk_arrangement = a.arrangement_id)
                `, (error, rows) => {
                res.json(rows);
            });
    });

    //henter arrangementer i bestem kategori
    app.get('/arrangement/:id', function (req, res) {
        let category_id = req.params['id'];
        let sql = `
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                FROM(( arrangement AS a
                    INNER JOIN kategori AS k
                    ON fk_kategori = k.kategori_id)
                    INNER JOIN event AS e
                    ON e.fk_arrangement = a.arrangement_id)
                    WHERE k.kategori_id = ${req.params['id']}`;
        if (category_id == 0) {
            db.query(`SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                                FROM(( arrangement AS a
                                INNER JOIN kategori AS k
                                ON fk_kategori = k.kategori_id)
                                INNER JOIN event AS e
                                ON e.fk_arrangement = a.arrangement_id)`, (error, rows) => {
                    res.json(rows);
                })
        } else {
            db.query(sql, (error, rows) => {
                res.json(rows);
            });
        }

    });


    //rendere siden admin
    app.get('/admin', function (req, res) {
        db.query(`
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
        FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id)
            `, (error, rows) => {
                db.query('SELECT * FROM kategori', function (err, data_kategori) {
                    res.render('pages/admin', {
                        side: "admin",
                        arrangement: rows,
                        kategori: data_kategori
                    });
                })
            });
    });

    //henter bestemt produkt i admin panel
    app.get('/admin/:id', function (req, res) {
        let category_id = req.params['id'];
        let sql = `
        SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                FROM(( arrangement AS a
                    INNER JOIN kategori AS k
                    ON fk_kategori = k.kategori_id)
                    INNER JOIN event AS e
                    ON e.fk_arrangement = a.arrangement_id)
                    WHERE k.kategori_id = ${req.params['id']}`;
        if (category_id == 0) {
            db.query(`SELECT a.*, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
                                FROM(( arrangement AS a
                                INNER JOIN kategori AS k
                                ON fk_kategori = k.kategori_id)
                                INNER JOIN event AS e
                                ON e.fk_arrangement = a.arrangement_id)`, (error, rows) => {
                    res.json(rows);
                })
        } else {
            db.query(sql, (error, rows) => {
                res.json(rows);
            });
        }

    });



    //henter et bestemt arrangement
    app.get('/enArrangement/:id', function (req, res) {
        db.query(`
        SELECT *
        FROM arrangement
        WHERE arrangement_id = ${req.params.id}`, (error, rows) => {
                res.json(rows);
            });
    });
    //tager data fra db og kan bruges i ejs
    app.get('/redigere/:id', function (req, res) {
        db.query(`SELECT a.*, a.beskrivelse AS besk, k.navn AS ka, e.tid AS tid, e.pris AS pris, e.dato AS dato
            FROM(( arrangement AS a
            INNER JOIN kategori AS k
            ON fk_kategori = k.kategori_id)
            INNER JOIN event AS e
            ON e.fk_arrangement = a.arrangement_id) WHERE arrangement_id = ${req.params.id}`, (error, rows) => {
                db.query(`SELECT * FROM kategori`, function (error1, rows1) {
                    res.render('pages/redigere', {
                        side: "redigere",
                        redigere: rows,
                        kategori: rows1
                    });
                })
            });
    });

    // kan kun updatere fra arrangment tabel
    app.post('/redigere/:id', function (req, res) {
        db.query(`UPDATE arrangement
        SET navn = ?,
        beskrivelse = ?,
        varighed = ?
        WHERE arrangement_id = ${req.params.id}`, [req.body.navn, req.body.beskrivelse, req.body.varighed, req.body.pris], (error, rows) => {
                if (error) {
                    console.log("Error:" + error);
                } else {
                    res.redirect("/admin")
                }
            })
    })

    //Sletter bestemt arrangement
    app.post('/slet/:id', function (req, res) {
        db.query(`
        DELETE FROM arrangement WHERE arrangement_id = ${req.params.id}`,
            (error, rows) => {
                if (error) {
                    console.log("Error:" + error);
                } else {
                    res.redirect("back")
                }
            })
    })

    // app.post('/opret', (req, res) => {
    //     db.query(`INSERT INTO arrangement AS a
    //     (navn,
    //     fk_kategori,
    //     varighed,
    //     billede,
    //     beskrivelse)
    //     VALUES (?, ?, ?, ?, ?);
    //     `, [navn, fk_kategori, varighed, billede, beskrivelse],
    //     (error, rows) => {
    //             if (error) {
    //                 console.log("Error:" + error);
    //             } else {
    //                 res.redirect("back")
    //             }
    //         })
    // })


    app.post('/opret', (req, res) => {
        db.query(`INSERT INTO arrangement(navn, fk_kategori, varighed, fk_billede, beskrivelse)
         VALUES (${req.body.navn}, ${req.body.fk_kategori},${req.body.varighed}, ${req.body.fk_billede},${req.body.beskrivelse})`,
        (error, rows) => {
                if (error) {
                    console.log( error);
                } else {
                    res.redirect("back")
                }
            })
    })

    


};//END module.export 



