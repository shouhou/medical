<Request>
    <Head>
        <Function> TB_INDEX_DRUG </Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <TB_INDEX_DRUG>
            <UNIT_CODE><%= unit_code %></UNIT_CODE>
            <UNIT_NAME><%= unit_name %></UNIT_NAME>
            <RAT_DRUG><%= rat_drug %></RAT_DRUG>
            <DDD><%= ddd %></DDD>
            <RAT_ZDRUG><%= rat_zdrug %></RAT_ZDRUG>
            <RAT_ADRUG><%= rat_adrug %></RAT_ADRUG>
            <FORM_DATE><%= form_date %></FORM_DATE>
        </TB_INDEX_DRUG>
    </Body>
</Request>
