\page rcl_buffer_management Buffer Management

The RCL component includes some APIs to deal with the radio buffers. There are two types of radio buffers:

* Transmit buffers encapsulate a single frame (payload). This is because when transmitting, it is already known how much data needs to be transferred.

\image html docs/rcl/source/images/tx_buffer_org.png width=600

* Receive buffers can contain zero or more received frames. This is because when receiving, it is not known how much data will be received.

\image html docs/rcl/source/images/rx_buffer_org.png width=800

Independently from the buffer type, the radio buffers need to follow a specific format so that the LRF can take a particular action depending on the PHY header.

# Usage

## Transmit buffers

The following steps are necessary to properly use a Tx buffer:

- Allocate memory for the Tx buffer entry considering all necessary fields and padding. This can be accomplished by first declaring an array, and using the ::RCL_TxBuffer_len_u32 helper to determine the total length of the Tx Buffer in 32-bit words. And second, declaring a pointer of type RCL_Buffer_TxBuffer and making it point to the memory location of the previously created array.

```c
    #define NUM_PKT 4

    uint32_t pktBuffer[NUM_PKT][RCL_TxBuffer_len_u32(NUM_PAD, HDR_LEN, MAX_PKT_LEN)];
    RCL_Buffer_TxBuffer *txBuffers[NUM_PKT];

    for (int i = 0; i < NUM_PKT; i++)
    {
        txBuffers[i] = (RCL_Buffer_TxBuffer *)vars.pktBuffer[i];
    }
```

- Initialize a Tx buffer entry with the correct header, payload and padding lengths. This is needed so that the Tx buffer entry is compatible with the [internal packet format](rcl_command_handlers.html) used by the LRF.

    + Declare a pointer that will be used to store the address where the first header byte of the entry should be stored.
    + Initialize the buffer entry
    + Insert payload, header and length fields.

```c
    for (int i = 0; i < NUM_PKT; i++)
    {
        uint8_t *txData;
        txData = RCL_TxBuffer_init(txBuffers[i], NUM_PAD, HDR_LEN, pktLen);
    }
```

- Place the Tx buffer entry in the linked list of packets to transmit.

```c
    for(int i = 0; i < NUM_PKT; i++)
    {
        RCL_TxBuffer_put(&txCmd->txBuffers, txBuffers[i]);
    }
```

## Receive buffers

The following steps are necessary to properly use a MultiBuffer for Rx operations:

- Allocate memory for the MultiBuffer entry. This can be accomplished by first declaring an array, then declaring the structure that holds the linked list that will be used by the LRF for the reception of packets. Finally, a pointer of type RCL_MultiBuffer should be declared and it should point to previously declared MultiBuffer array.

```c
    #define MULTI_BUF_SZ 2048

    uint32_t multiBufferArray[MULTI_BUF_SZ / 4];
    List_List multiBuffers = { 0 };
    RCL_MultiBuffer *multiBuffer;
    RCL_MultiBuffer *multiBuffer = (RCL_MultiBuffer *) multiBufferArray;
```

- Initialize a MultiBuffer entry so that it can be provided to the RCL for storing received packets.

 ```c
    RCL_MultiBuffer_init(multiBuffer, MULTI_BUF_SZ);
 ```

- Place the MultiBuffer entry in the linked list used by the RCL for packet reception.

```c
    RCL_MultiBuffer_put(&multiBuffers, multiBuffer);
```

- Upon reception, data entries can be accessed by first declaring a data entry, and then using the ::RCL_MultiBuffer_RxEntry_get API to get the entry.

```c
    List_List finishedBuffers;
    /* Prepare list of RX buffers that are done */
    List_clearList(&finishedBuffers);

    /* Read out received packet */
    RCL_Buffer_DataEntry *rxPkt = RCL_MultiBuffer_RxEntry_get(&rxCmd->rxBuffers, &finishedBuffers);
```

- Clear entry or entries for reuse by the RCL. This is necessary so that after reception the MultiBuffer can be reused for storing packets, and can be accomplished by getting a list of the MultiBuffers that are done, checking which MultiBuffers are free before clearing them, and adding them back to the list.

```c
    /* Make finished buffers available to RCL command */
    while ((multiBuffer = RCL_MultiBuffer_get(&finishedBuffers)) != NULL)
    {
        RCL_MultiBuffer_clear(multiBuffer);
        RCL_MultiBuffer_put(&multiBuffers, multiBuffer);
    }
```

