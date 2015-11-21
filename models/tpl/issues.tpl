<Request>
    <Head>
        <Function>MAJOR_ISSUES</Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <MAJOR_ISSUES>
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
                <DECISION_TYPE><%= decision_type %></DECISION_TYPE>
                <PROCEDURED_DETAIL_ID><%= procedured_detail_id %></PROCEDURED_DETAIL_ID>
                <DECISION_DATE_TIME><%= decision_date_time %></DECISION_DATE_TIME>
                <DECISION_RESULT><%= decision_result %></DECISION_RESULT>
                <PUBLIC_TYPE><%= public_type %></PUBLIC_TYPE>
                <PUBLIC_DTAE_TIME><%= public_dtae_time %></PUBLIC_DTAE_TIME>
                <PUBLIC_RESULT><%= public_result %></PUBLIC_RESULT>
                <RECOMMEN_TYPE><%= recommen_type %></RECOMMEN_TYPE>
            </DETAIL>
        </MAJOR_ISSUES>
    </Body>
</Request>
