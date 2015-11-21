<Request>
    <Head>
        <Function>MAJOR_FINANCE</Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <MAJOR_FINANCE>
            <MAIN>
                <UNIT_CODE><%= unit_code %></UNIT_CODE>
                <UNIT_NAME><%= unit_name %></UNIT_NAME>
                <EVENT_NUM><%= event_num %></EVENT_NUM>
                <ORG_CODE><%= org_code %></ORG_CODE>
                <EVENT_ID><%= event_id %></EVENT_ID>
                <EVENT_NAME><%= event_name %></EVENT_NAME>
                <PROCEDURE><%= procedure %></PROCEDURE>
                <EVENT_DATE_TIME><%= event_date_time %></EVENT_DATE_TIME>
            </MAIN>
            <DETAIL>
                <UNIT_CODE><%= unit_code %></UNIT_CODE>
                <EVENT_ID><%= event_id %></EVENT_ID>
                <PROCEDURED_DETAIL_ID><%= procedured_detail_id %></PROCEDURED_DETAIL_ID>
                <DECISION_TYPE><%= decision_type %></DECISION_TYPE>
                <DECISION_DATE_TIME><%= decision_date_time %></DECISION_DATE_TIME>
                <DECISION_RESULT><%= decision_result %></DECISION_RESULT>
                <PUBLIC_TYPE><%= public_type %></PUBLIC_TYPE>
                <PUBLIC_DTAE_TIME><%= public_dtae_time %></PUBLIC_DTAE_TIME>
                <PUBLIC_RESULT><%= public_result %></PUBLIC_RESULT>
                <TENDER_TYPE><%= tender_type %></TENDER_TYPE>
                <TENDER_DATE_TIME><%= tender_date_time %></TENDER_DATE_TIME>
                <CHECK_TYPE><%= check_type %></CHECK_TYPE>
                <CHECK_DTAE_TIME><%= check_dtae_time %></CHECK_DTAE_TIME>
                <CHECK_RESULT><%= check_result %></CHECK_RESULT>
            </DETAIL>
        </MAJOR_FINANCE>
    </Body>
</Request>
