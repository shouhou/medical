<Request>
    <Head>
        <Function> MAJOR_PUNISH </Function>
        <Operation>0</Operation>
    </Head>
    <Body>
        <MAJOR_PUNISH>
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
                <PROCEDURED_DETAIL_ID><%= procedured_detail_id %></PROCEDURED_DETAIL_ID>
                <EVENT_ID><%= event_id %></EVENT_ID>
                <PROCEDURED_DATE_TIME><%= procedured_date_time %></PROCEDURED_DATE_TIME>
                <DECISION_TYPE><%= decision_type %></DECISION_TYPE>
                <DECISION_DATE_TIME><%= decision_date_time %></DECISION_DATE_TIME>
                <DECISION_RESULT><%= decision_result %></DECISION_RESULT>
            </DETAIL>
        </MAJOR_PUNISH>
    </Body>
</Request>