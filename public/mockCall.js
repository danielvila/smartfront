const client = {
    "mock": [
        {
            "id": 1,
            "codigo": "54993",
            "tipo": "2",
            "descripcion": "jose perez",
            "id_fiscal": "cdc7e038-22d0-3f72-954a-df8d5769a8c4",
            "dv": "55",
            "representante": "Ms. Maci Becker",
            "direcction1": "43551 Simonis Causeway Suite 139\nRauberg, WI 79915",
            "direcction2": "2491 Graham Divide\nLake Nichole, CA 31629",
            "pais": "Panama",
            "estado": "North Carolina",
            "ciudad": "Washington",
            "municipio": "Nikoview",
            "telefono": "1-213-480-6213",
            "celular": "1-865-656-0700",
            "activo": 1,
            "email": "nichole22@example.net",
            "deleted_at": null,
            "created_at": "2022-03-17T03:07:32.000000Z",
            "updated_at": "2022-03-17T03:59:20.000000Z"
        }
    ]
}
export let mockServices = () => new Promise(resolve => resolve(client));