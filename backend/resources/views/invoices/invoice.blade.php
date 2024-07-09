<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f0f9f0;
            color: #333;
        }
        .company-name {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
            color: #2a9d8f;
            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
        }
        .invoice {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #2a9d8f;
            border-radius: 8px;
            background-color: #ffffff;
        }
        h2 {
            text-align: center;
            color: #2a9d8f;
        }
        .invoice-details {
            margin-top: 20px;
        }
        .invoice-details p {
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .invoice-details p strong {
            flex: 1;
            text-align: left;
            padding-right: 10px;
        }
        .invoice-details p span {
            flex: 2;
            text-align: left;
            padding-left: 10px;
        }
        .date-time {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="company-name">Wasthra Ceylon</div>
    <div class="invoice">
        <h2>Invoice</h2>
        <div class="invoice-details">
            <p><strong>Purchase ID:</strong> <span>{{ $purchase->purchase_id }}</span></p>
            <p><strong>Material ID:</strong> <span>{{ $purchase->material_id }}</span></p>
            <p><strong>Supplier ID:</strong> <span>{{ $purchase->supplier_id }}</span></p>
            <p><strong>Date:</strong> <span>{{ $purchase->date }}</span></p>
            <p><strong>Quantity:</strong> <span>{{ $purchase->qty }}</span></p>
            <p><strong>Unit Price:</strong> <span>{{ $purchase->unit_price }}</span></p>
            <p><strong>Total Amount:</strong> <span>{{ $purchase->total_amount }}</span></p>
        </div>
        <div class="date-time">
            <span>{{ now()->format('Y-m-d') }}</span>
            <span>{{ now()->format('H:i:s') }}</span>
        </div>
    </div>
</body>
</html>
