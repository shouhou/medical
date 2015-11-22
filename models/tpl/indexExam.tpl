<Request>
    <Head>
        <Function>TB_INDEX_EXAM</Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <TB_INDEX_EXAM>
            <UNIT_CODE><%= unit_code %></UNIT_CODE>
            <UNIT_NAME><%= unit_name %></UNIT_NAME>
            <ITEM_NAME><%= item_name %></ITEM_NAME>
            <ITEM_CODE><%= item_code %></ITEM_CODE>
            <AMOUNT><%= amount %></AMOUNT>
            <NUM><%= num %></NUM>
            <DEPT><%= dept %></DEPT>
            <DOCTOR><%= doctor %></DOCTOR>
            <FORM_DATE><%= form_date %></FORM_DATE>
            <CREATE_DATE_TIME><%= create_date_time %></CREATE_DATE_TIME>
            <STANDARD><%= standard %></STANDARD>
        </TB_INDEX_EXAM>
    </Body>
</Request>
