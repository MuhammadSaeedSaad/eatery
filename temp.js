const config = {
    _id: "my-mongo-set",
    members: [
        {
            _id: 0,
            host: "m1:27017"
        },
        {
            _id: 1,
            host: "m2:27017"
        },
        {
            _id: 2,
            host: "m3:27017"
        }
    ]
}

// rs.initiate(config)